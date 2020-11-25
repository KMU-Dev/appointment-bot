pipeline {
    options {
        disableConcurrentBuilds()
    }
    agent {
        kubernetes {
            yamlFile 'ci/build-pod.yaml'
            defaultContainer 'python'
        }
    }
    environment {
        // TAGS
        APP_TAG = 'registry.webzyno.com/appointment-bot/app'
        TAG_NAME = getTagName(env.BRANCH_NAME)
    }
    stages {
        stage('Pre-Build') {
            stages {
                stage('Install necessary package') {
                    environment {
                        TZ = 'Asia/Taipei'
                    }
                    steps {
                        // configure tzdata
                        sh 'ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone'

                        sh 'apt update'
                        
                        // install Docker
                        sh 'apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y'
                        sh 'curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -'
                        sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"'
                        sh 'apt update && apt install docker-ce docker-ce-cli containerd.io -y'

                        // install skaffold
                        sh 'curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && install skaffold /usr/local/bin/'
                    }
                }
                stage('Configure Docker') {
                    environment {
                        REGISTRY_USERNAME = credentials('appointment-bot-registry-username')
                        REGISTRY_PASSWORD = credentials('appointment-bot-registry-password')
                        JENKINS_DELEGATION_KEY = credentials('appointment-bot-jenkins-notary-delegation-private-key')
                    }
                    steps {
                        sh "docker login -u '${env.REGISTRY_USERNAME}' -p '${env.REGISTRY_PASSWORD}' registry.webzyno.com"
                        sh 'docker trust key load --name jenkins $JENKINS_DELEGATION_KEY'
                    }
                }
                stage('Install required package') {
                    steps {
                        sh 'pip install -r requirements.txt'
                    }
                }
            }
        }
        stage('Build') {
            stages {
                stage('Build staging image') {
                    environment {
                        GIT_COMMIT = sh(script: "git log -1 --pretty=%h | tr -d [:space:]", returnStdout: true).trim()
                    }
                    steps {
                        sh 'skaffold build -p ci --file-output=tags.json'
                    }
                }
            }
        }
        stage('Analysis') {
            steps {
                // Run pylint
                sh 'mkdir reports'
                script {
                    try {
                        sh 'pylint bot > reports/pylint.report'
                    } catch (err) {
                        echo err.getMessage()
                    }
                }
            }
            post {
                always {
                    recordIssues(
                        tool: pyLint(pattern: 'reports/pylint.report'),
                        unstableTotalAll: 1,
                    )
                }
            }
        }
        stage('Deploy') {
            stages {
                stage('Build and deploy release image') {
                    when {
                        anyOf {
                            branch 'master';
                            branch 'development';
                        }
                    }
                    environment {
                        DOCKER_CONTENT_TRUST = '1'
                        DOCKER_CONTENT_TRUST_SERVER = 'https://notary.webzyno.com'
                        DOCKER_CONTENT_TRUST_REPOSITORY_PASSPHRASE = credentials('appointment-bot-jenkins-delegation-key-passphrase')
                    }
                    steps {
                        sh 'skaffold build -p ci:release --file-output=tags.json'
                    }
                }
            }
        }
    }
}

def getTagName(branchName) {
    if (branchName == "master") return "latest";
    else if (branchName == "development") return "nightly";
    else return branchName.substring(1);
}

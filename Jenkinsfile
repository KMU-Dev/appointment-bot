pipeline {
    options {
        disableConcurrentBuilds()
    }
    agent {
        kubernetes {
            yamlFile 'ci/build-pod.yaml'
            defaultContainer 'node'
        }
    }
    environment {
        TZ = 'Asia/Taipei'
        GIT_COMMIT = sh(script: "git log -1 --pretty=%h | tr -d [:space:]", returnStdout: true).trim()

        TAG_NAME = "ghcr.io/kmu-dev/appointment-bot:dirty-${GIT_COMMIT}"
    }
    stages {
        stage('Pre-Build') {
            stages {
                stage('Install necessary package') {
                    steps {
                        // configure tzdata
                        // sh 'ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone'

                        sh 'apt update'
                        
                        // install Docker
                        sh 'apt install apt-transport-https ca-certificates curl gnupg lsb-release -y'
                        sh 'curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg'
                        sh 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null'
                        sh 'apt update && apt install docker-ce docker-ce-cli containerd.io -y'

                        // install skaffold
                        // sh 'curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && install skaffold /usr/local/bin/'

                        // install yarn
                        /* sh 'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -'
                        sh 'echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list'
                        sh 'apt update && apt install yarn -y' */
                    }
                }
                stage('Configure Docker') {
                    environment {
                        REGISTRY_USERNAME = 'ZhaoTzuHsien'
                        REGISTRY_PASSWORD = credentials('github-jenkins-pat') // GitHub personal access token
                        // JENKINS_DELEGATION_KEY = credentials('appointment-bot-jenkins-notary-delegation-private-key')
                    }
                    steps {
                        sh 'echo $REGISTRY_PASSWORD | docker login ghcr.io -u $REGISTRY_USERNAME --password-stdin'
                        // sh "docker login -u '${env.REGISTRY_USERNAME}' -p '${env.REGISTRY_PASSWORD}' ghcr.io"
                        // sh 'docker trust key load --name jenkins $JENKINS_DELEGATION_KEY'
                    }
                }
                stage('Install required package') {
                    steps {
                        sh 'yarn --version && yarn'
                    }
                }
            }
        }
        stage('Build') {
            stages {
                stage('Build staging image') {
                    /* environment {
                        GIT_COMMIT = sh(script: "git log -1 --pretty=%h | tr -d [:space:]", returnStdout: true).trim()
                    } */
                    steps {
                        sh "docker build . -t ${TAG_NAME}"
                        sh "docker push ${TAG_NAME}"
                    }
                }
            }
        }
        stage('Analysis') {
            steps {
                // Run yarn lint
                sh 'mkdir reports'
                sh 'yarn lint -o reports/eslint.report -f checkstyle'
            }
            post {
                always {
                    recordIssues(
                        tool: checkStyle(pattern: 'reports/eslint.report'),
                        enabledForFailure: true,
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
                        sh 'skaffold build -p ci:release'
                        sh 'docker push $APP_TAG:$TAG_NAME'
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

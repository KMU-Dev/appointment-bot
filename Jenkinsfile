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

        IMAGE_NAME = 'ghcr.io/kmu-dev/appointment-bot'
        TAG_NAME = "${IMAGE_NAME}:dirty-${GIT_COMMIT}"
    }
    stages {
        stage('Pre-Build') {
            stages {
                stage('Install necessary package') {
                    steps {
                        sh 'apt update'
                        
                        // install img
                        sh 'apt install uidmap libseccomp-dev'
                        sh 'export IMG_SHA256="cc9bf08794353ef57b400d32cd1065765253166b0a09fba360d927cfbd158088"'
                        sh 'curl -fSL "https://github.com/genuinetools/img/releases/download/v0.5.11/img-linux-amd64" -o "/usr/local/bin/img" && echo "${IMG_SHA256}  /usr/local/bin/img" | sha256sum -c - && chmod a+x "/usr/local/bin/img"'
                        sh 'img -h'
                    }
                }
                stage('Configure Docker') {
                    environment {
                        REGISTRY_USERNAME = 'ZhaoTzuHsien'
                        REGISTRY_PASSWORD = credentials('github-jenkins-pat') // GitHub personal access token
                    }
                    steps {
                        sh 'echo $REGISTRY_PASSWORD | img login ghcr.io -u $REGISTRY_USERNAME --password-stdin'
                    }
                }
                stage('Install required package') {
                    steps {
                        sh 'yarn --version && yarn'
                    }
                }
                stage('Configure CI environment') {
                    environment {
                        CONFIG = credentials('appointment-bot-config')
                    }
                    steps {
                        sh 'mkdir -p config'
                        sh 'cp $CONFIG config/config.yaml'
                    }
                }
            }
        }
        stage('Build') {
            stages {
                stage('Build staging image') {
                    steps {
                        sh "img build . -t ${TAG_NAME}"
                        sh "img push ${TAG_NAME}"
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
        stage('Test') {
            stages {
                stage('Unit test') {
                    steps {
                        sh 'yarn test:cov:ci'
                    }
                }
                stage('E2E test') {
                    environment {
                        JEST_JUNIT_OUTPUT_FILE = 'e2e.junit.xml'
                    }
                    steps {
                        sh 'yarn test:e2e:ci'
                    }
                }
            }
            post {
                always {
                    junit '*junit.xml'
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
                        RELEASE_TAG_NAME = "${IMAGE_NAME}:${getTagName(env.BRANCH_NAME)})"
                    }
                    steps {
                        sh 'img tag $TAG_NAME $RELEASE_TAG_NAME'
                        sh 'img push $RELEASE_TAG_NAME'
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

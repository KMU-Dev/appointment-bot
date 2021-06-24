pipeline {
    options {
        disableConcurrentBuilds()
        parallelsAlwaysFailFast()
    }
    agent {
        kubernetes {
            yamlFile 'ci/build-pod.yaml'
        }
    }
    environment {
        TZ = 'Asia/Taipei'
        GIT_COMMIT = sh(script: "git log -1 --pretty=%h | tr -d [:space:]", returnStdout: true).trim()

        IMAGE_NAME = 'ghcr.io/kmu-dev/appointment-bot'
        TAG_NAME = "${IMAGE_NAME}:dirty-${GIT_COMMIT}"
    }
    stages {
        stage('Parallel') {
            parallel {
                stage('Build') {
                    agent {
                        node {
                            label 'docker'
                        }
                    }
                    steps {
                        sh "docker build . -t ${TAG_NAME}"
                        sh "docker push ${TAG_NAME}"
                    }
                }
                stage('Analysis & Test') {
                    container('node') {
                        stage('Configure') {
                            stages {
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
                    }
                }
            }
        }
        stage('Deploy') {
            agent {
                node {
                    label 'docker'
                }
            }
            stages {
                stage('Build and deploy release image') {
                    when {
                        anyOf {
                            branch 'master';
                            branch 'development';
                        }
                    }
                    environment {
                        RELEASE_TAG_NAME = "${IMAGE_NAME}:${getTagName(env.BRANCH_NAME)}"
                    }
                    steps {
                        sh 'docker tag $TAG_NAME $RELEASE_TAG_NAME'
                        sh 'docker push $RELEASE_TAG_NAME'
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

pipeline {
    options {
        disableConcurrentBuilds()
    }
    agent {
        kubernetes {
            label 'appointment-bot-build'
            yamlFile 'ci/build-pod.yaml'
            defaultContainer 'ubuntu'
        }
    }
    stages {
        stage('Pre-Build') {
            environment {
                TZ = 'Asia/Taipei'
            }
            stages {
                stage('Install necessary package') {
                    steps {
                        // configure tzdata
                        sh 'ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone'

                        sh 'apt update'

                        // install Git
                        sh 'apt install git -y'
                        
                        // install Docker
                        sh 'apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common -y'
                        sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -'
                        sh 'add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"'
                        sh 'apt update && apt install docker-ce docker-ce-cli containerd.io -y'
                    }
                }
            }
        }
    }
}
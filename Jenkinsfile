pipeline {
	agent any 
	tools {
		nodejs "nodejs-16.20"
	}
	environment { 
		buildUser = ''        
        dockerImage = ''
        dockerImageName = 'react-app'
	}
	stages{
		stage("Checkout") {
			steps {
				checkout scm
			}
		}

        stage("Environment") {
            environment {
                BRANCH_NAME = getBranchName()
            }
            steps { 
                script{ 
                    sh "git --version"
                    echo "branch name : ${BRANCH_NAME}"
                    sh "docker --version"
                    sh "printenv"
                    wrap([$class : 'BuildUser']){
                        buildUser = env.BUILD_USER_ID + "-" + env.BUILD_USER 
                    }
                    echo "buildUser is : ${buildUser}"
                }
            }
        }

        stage("Installation") {
			steps {
				sh "node -v"								
				sh "npm install"
			}			
		}  

        stage("Build Image") {
            steps{ 
                script {
                    dockerImage = docker.build dockerImageName
                }
            }
        }

        stage("Push Image"){
            environment{
                dockerCredential = 'docker-hub'
            }
            steps {
                script {
                    docker.withRegistry( 'https://registry.hub.docker.com', dockerCredential){
                        dockerImage.push('latest')
                    }
                }
            }
        }
	}
}

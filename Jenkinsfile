def getBranchName(){
	return scm.branches[0].name
}

pipeline {
	agent any 
	tools {
		nodejs "nodejs-16.20"
	}
	environment { 
		buildUser = ''        
        dockerImage = ''
        dockerImageName = 'react-app'
		buildSuccess = false
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

        stage("Build and Push Image"){
           environment { 
				DOCKER_TAG="${env.BUILD_NUMBER}"
				DOCKER_IMAGE="react-app-cicd"	
				BRANCH_NAME = getBranchName()										
			}		
			steps {			
				script{
					try {
						echo "Branch Name is : ${BRANCH_NAME}"
						if (BRANCH_NAME == "*/main"){
							withCredentials([usernamePassword(credentialsId: "docker-hub", usernameVariable: "DOCKER_USERNAME", passwordVariable: "DOCKER_PASSWORD")]){																							
								sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
								sh "docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} . --no-cache"
								sh "docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"					
								sh "docker images | grep ${DOCKER_IMAGE}"														
								sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"					
								sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"										
								sh "docker rmi -f ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"
								sh "docker rmi -f ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"
							}										
						}
						buildSuccess = true
					}catch(err) {
						throw err;					
					}
				}														
			}
        }
	}
}

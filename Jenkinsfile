pipeline {
    // Define Agent as a Kubernetes Pod
    agent {
        kubernetes {
            yaml """
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  # Container 1: JNLP Agent to connect with Jenkins Master
                  - name: jnlp
                    image: jenkins/inbound-agent:jdk17
                    args: ['\$(JENKINS_SECRET)', '\$(JENKINS_NAME)']
                    workingDir: /home/jenkins/agent
                    volumeMounts:
                    - name: workspace-volume
                      mountPath: /home/jenkins/agent

                  # Container 2: Node.js for install and src code quality checks
                  - name: node
                    image: node:20-alpine
                    command: ["sleep"]
                    args: ["9999999"]
                    volumeMounts:
                        - name: workspace-volume
                          mountPath: /home/jenkins/agent
                    resources:
                        requests:
                          ephemeral-storage: "512Mi"
                        limits:
                          ephemeral-storage: "1Gi"
                      
                  # Container 3: Kaniko for building image
                  # CHANGE: Use Kaniko 'debug' image. This image contains shell and 'sleep' command.
                  - name: kaniko
                    image: gcr.io/kaniko-project/executor:debug
                    imagePullPolicy: Always
                    command: [sleep]
                    args: [9999999]
                    volumeMounts:
                    - name: workspace-volume
                      mountPath: /home/jenkins/agent
                    - name: docker-config
                      mountPath: /kaniko/.docker/
                    resources:
                      requests:
                        ephemeral-storage: "2Gi"
                      limits:
                        ephemeral-storage: "3Gi"
                  volumes:
                  # Volume to share workspace between all containers
                  - name: workspace-volume
                    emptyDir: {}
                  # Volume from Secret for Kaniko to authenticate with Docker Hub
                  - name: docker-config
                    secret:
                      secretName: dockerhub
                      items:
                        - key: .dockerconfigjson
                          path: config.json
                """
        }
    }

    // Update environment variables
    environment {
        DOCKER_IMAGE_NAME = 'nguyentankdb17/microservice_app_frontend'
        GIT_CONFIG_REPO_CREDENTIALS_ID = 'github'
        GIT_CONFIG_REPO_URL = 'https://github.com/nguyentankdb17/microservice_app-config'
    }

    stages {
        // Checkout src code from GitHub
        stage('1. Checkout Code') {
            steps {
                script {
                    echo "Start checking out source code..."
                     git url: 'https://github.com/nguyentankdb17/microservice_app-frontend.git',
                        branch: 'main',
                        credentialsId: 'github'
                    echo "Checkout completed."
                }
            }
        }

        // Code Style & Quality Check
        stage('2. Code Style & Quality Check') {
            steps {
                container('node') {
                    script {
                        // Step 1: Install dependencies
                        echo 'Install required dependencies to start checking...'
                        dir('app') {
                            sh 'npm ci'
                        }
                        echo "Dependencies installed successfully"

                        // Step 2: Run code quality check
                        echo "Running Code Quality check..."
                        dir('app') {
                            sh 'npx eslint .'
                        }
                        echo "Code Quality check completed."

                        // Step 3: Run code style check
                        echo "Running formatting check..."
                        dir('app') {
                            sh 'npx prettier --check .'
                        }
                        echo "Formatting check completed."
                    }
                }
            }
        }

        // Build and Push with KANIKO
        stage('3. Build & Push Docker Image (with Kaniko)') {
            steps {
                // Run `script` outside `container` to get git commit first
                script {
                    // Step 1: Get git commit hash in default 'jnlp' container (where git is available)
                    def gitCommit = sh(script: 'git rev-parse HEAD', returnStdout: true).trim().substring(0, 8)
                    def dockerImageTag = "${DOCKER_IMAGE_NAME}:${gitCommit}"

                    // Step 2: Enter 'kaniko' container to build
                    container('kaniko') {
                        echo "Building and pushing image with Kaniko: ${dockerImageTag}"
                        dir('app') {
                          sh """
                            /kaniko/executor \
                              --context . \
                              --dockerfile Dockerfile \
                              --destination ${dockerImageTag}
                          """
                        }
                        echo "Build and push image to DockerHub with Kaniko completed."
                    }
                }
            }
        }

        // Update K8s manifest repository with new image tag
        stage('4. Update K8s Manifest Repo') {
            steps {
                // Run in default 'jnlp' container
                script {
                    def gitCommit = sh(script: 'git rev-parse HEAD', returnStdout: true).trim().substring(0, 8)
                    def dockerImageTag = "${DOCKER_IMAGE_NAME}:${gitCommit}"
                
                    echo "Starting to update K8s manifest repository ..."
                
                    // Use SSH credentials
                    sshagent(credentials: [GIT_CONFIG_REPO_CREDENTIALS_ID]) {
                        // Add to known_hosts to avoid failure on host-key checking
                        sh 'mkdir -p ~/.ssh'
                        sh 'ssh-keyscan github.com >> ~/.ssh/known_hosts'
                        // Clone repo from main branch via SSH
                        sh "git clone -b main git@github.com:nguyentankdb17/microservice_app-config.git cd-config-repo"
                
                        dir('cd-config-repo') {
                            echo "Updating image tag in frontend_values.yaml to ${gitCommit}"
                            
                            // Update frontend_values.yaml file
                            sh "sed -i 's|tag: .*|tag: \"${gitCommit}\"|g' frontend_values.yaml"
                
                            // Configure git user
                            sh "git config user.email 'nguyentankdb17@gmail.com'"
                            sh "git config user.name 'nguyentankdb17'"
                
                            // Commit and push changes
                            sh "git add frontend_values.yaml"
                            sh "git commit -m 'ci: Update image tag to ${gitCommit}'"
                            sh "git push origin main"
                        }
                    }
                
                    echo "K8s manifest repository updated successfully."
                }

            }
        }
    }
}

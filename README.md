# Dockerized service

## Features

1. **Node.js Service**:
   - A simple Node.js service built with environment variables (`.env` file).
   - Includes a `/secret` route secured with Basic Authentication.

2. **Dockerized Application**:
   - The application is containerized with a `Dockerfile` for portability.

3. **Remote Server Setup**:
   - An VM is provisioned for hosting the service.
   - The SSH public key is added to the server for secure access.

4. **CI/CD with GitHub Actions**:
   - Automated deployment workflow:
     - Builds the Docker image.
     - Pushes the image to DockerHub.
     - Pulls and deploys the image on the VM.

## Prerequisites

1. **Node.js Installed**:
   - [Node.js](https://nodejs.org/) must be installed locally to develop the service.

2. **DockerHub Account**:
   - A valid DockerHub account to store and retrieve Docker images.

3. **GitHub Repository**:
   - Secrets for deployment must be configured in the repository.

## Steps

## 1.Create Node.js service 

1. Build a simple Node.js service with two routes:
   - `/`: Returns "Hello, World!".
   - `/secret`: Returns a protected message using Basic Auth.
2. Add a `.env` file with:
   ```env
   SECRET_MESSAGE=YourSecretMessage
   USERNAME=YourUsername
   PASSWORD=YourPassword
   ```
3. Test the service locally before proceeding.

## 2. Write dockerfile
1. Create dockerfile for nodejs service:
```
FROM node:22-alpine AS prod

WORKDIR /app

COPY package*json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm","start"]
```
2. Build and test docker image locally:
```
docker build -t nodejs-service .
docker run -p 3000:3000 nodejs-service
```

## 3. Set up remote linux server (Terraform)
1. Write terraform files to set up vm on preferred service(create ssh key pair etc)
2. Initialize terraform
```
    # Initialize project
    terraform init

    # Preview changes
    terraform plan

    # Apply configurations
    terraform apply
```

## 4. Set up ansible-playbook to run docker in remote server
1. Set up inventory.ini to allow ssh into remote server
2. Set up deploy.yml to install, run docker
3. Test and run ansible-playbook
```
ansible-playbook -i inventory.ini deploy.yml --ask-become-pass
```

## 5. Configure Github Secrets & set up Github Action Workflows
1. Add secrets, vars in github repo
   
2. Setup action workflows
  - build
     - Checkout Code
     - Login to Dockerhub
     - Build and push Docker image
  - deploy
     - Checkout Code
     - Run ansible playbook

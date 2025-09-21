pipeline {
  agent any
  options {
    skipDefaultCheckout(true)
  }
  tools {
    nodejs 'NodeJS 24.8.0'
  }
  stages {
    stage('Clean') {
      steps {
        cleanWs(disableDeferredWipeout: true)
      }
    }
    stage('Checkout') {
      steps {
        // This checks out the latest code in the now-clean workspace
        checkout scm
      }
    }
    stage('Build') {
      steps {
        sh 'npm i'
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'rm -rf /home/shirasao-ems/htdocs/ems.shirasao.com/*'
        sh 'cp -r /root/.jenkins/workspace/ems.shirasao.com/dist/UI/browser/* /home/shirasao-ems/htdocs/ems.shirasao.com/'
      }
    }
  }
}
pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                // Jenkins ya hace esto, pero por claridad lo dejamos
                git 'https://github.com/Mildred2608/FiestaLandia.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'echo Instalando dependencias...'
                // Si usas Python:
                // sh 'pip install -r requirements.txt'
                // Si usas Node.js:
                // sh 'npm install'
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                sh 'echo Ejecutando pruebas...'
                // Ejemplo para Django:
                // sh 'python manage.py test'
            }
        }
    }
}

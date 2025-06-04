pipeline {
    agent any

    environment {
        VIRTUAL_ENV = 'venv'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git 'https://github.com/Mildred2608/FiestaLandia.git'
            }
        }

        stage('Configurar entorno virtual') {
            steps {
                sh '''
                    python3 -m venv $VIRTUAL_ENV
                    . $VIRTUAL_ENV/bin/activate
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Migraciones de base de datos') {
            steps {
                sh '''
                    . $VIRTUAL_ENV/bin/activate
                    python manage.py migrate
                '''
            }
        }

        stage('Correr pruebas unitarias') {
            steps {
                sh '''
                    . $VIRTUAL_ENV/bin/activate
                    python manage.py test
                '''
            }
        }

        stage('Servidor local (opcional)') {
            when {
                expression { return false } // pon true si quieres levantar el servidor
            }
            steps {
                sh '''
                    . $VIRTUAL_ENV/bin/activate
                    python manage.py runserver 0.0.0.0:8000
                '''
            }
        }
    }
}

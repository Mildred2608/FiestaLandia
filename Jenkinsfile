pipeline {
    agent any

    environment {
        VIRTUAL_ENV = 'venv'
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/Mildred2608/FiestaLandia.git'
            }
        }

        stage('Configurar entorno virtual') {
            steps {
                bat '''
                    python -m venv %VIRTUAL_ENV%
                    call %VIRTUAL_ENV%\\Scripts\\activate.bat
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Migraciones de base de datos') {
            steps {
                bat '''
                    call %VIRTUAL_ENV%\\Scripts\\activate.bat
                    python manage.py migrate
                '''
            }
        }

        stage('Correr pruebas unitarias') {
            steps {
                bat '''
                    call %VIRTUAL_ENV%\\Scripts\\activate.bat
                    python manage.py test
                '''
            }
        }

        stage('Servidor local (opcional)') {
            when {
                expression { return false } // pon true si quieres levantar el servidor
            }
            steps {
                bat '''
                    call %VIRTUAL_ENV%\\Scripts\\activate.bat
                    python manage.py runserver 0.0.0.0:8000
                '''
            }
        }
    }
}

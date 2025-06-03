from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.app'  # Esto debe coincidir con INSTALLED_APPS
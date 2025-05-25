from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario, TipoUsuario

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = ['id', 'nombre', 'descripcion']

class UsuarioSerializer(serializers.ModelSerializer):
    tipo_usuario = TipoUsuarioSerializer(read_only=True)
    
    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nombre', 'telefono', 'direccion_envio', 'tipo_usuario', 'is_staff']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            
            if not user:
                raise serializers.ValidationError("Credenciales inválidas")
            if not user.is_active:
                raise serializers.ValidationError("Cuenta desactivada")
        else:
            raise serializers.ValidationError("Debe proporcionar email y contraseña")

        data['user'] = user
        return data
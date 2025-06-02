from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Usuario, TipoUsuario
from django.contrib.auth.password_validation import validate_password
from .models import GrupoMusical

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = Usuario
        fields = ['email', 'nombre', 'telefono', 'direccion_envio', 'password']

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            email=validated_data['email'],
            nombre=validated_data.get('nombre', ''),
            telefono=validated_data.get('telefono', ''),
            direccion_envio=validated_data.get('direccion_envio', ''),
            password=validated_data['password']
        )
        return user

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
    
class GrupoMusicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoMusical
        fields = '__all__'
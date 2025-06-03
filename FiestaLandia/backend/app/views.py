from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, UsuarioSerializer
from .models import TipoUsuario, Usuario
from .serializers import RegisterSerializer, UsuarioSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from .models import GrupoMusical
from .serializers import GrupoMusicalSerializer


User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email y contraseña requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'El usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UsuarioSerializer(user).data,
            'user_type': user.tipo_usuario.nombre if user.tipo_usuario else None
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UsuarioSerializer(user).data,
            'user_type': user.tipo_usuario.nombre if user.tipo_usuario else None
        })

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.tipo_usuario or request.user.tipo_usuario.nombre != 'admin':
            return Response(
                {'error': 'Acceso no autorizado'},
                status=status.HTTP_403_FORBIDDEN
            )
        return Response({'message': 'Bienvenido al panel de administración'})

class GruposViewSet(viewsets.ModelViewSet):
    queryset = GrupoMusical.objects.all()
    serializer_class = GrupoMusicalSerializer
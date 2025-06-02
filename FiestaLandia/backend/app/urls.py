from django.urls import path
from .views import LoginView, RegisterView, UserView, AdminDashboardView

from .views import GruposViewSet

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('', include(router.urls)),
]




router = DefaultRouter()
router.register(r'grupos', GrupoMusicalViewSet)


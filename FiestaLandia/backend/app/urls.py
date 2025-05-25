from django.urls import path
from .views import LoginView, UserView, AdminDashboardView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WorkerRegisterView,
    AdminRegisterView,
    LoginView,
    ProjectViewSet,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView
from .views import AdminWorkersProjectsView

# Create a router for ProjectViewSet
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')

urlpatterns = [
    path('register/worker/', WorkerRegisterView.as_view(), name='register-worker'),
    path('register/admin/', AdminRegisterView.as_view(), name='register-admin'),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('admin/workers-projects/', AdminWorkersProjectsView.as_view(), name='admin-workers-projects'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Include DRF router URLs
    path('', include(router.urls)),
]

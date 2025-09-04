from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import WorkerRegisterSerializer, AdminRegisterSerializer, UserSerializer, ProjectSerializer
from .models import User
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Custom permission: only workers can create projects
class IsWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "WORKER"

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == "create":
            return [IsWorker()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role == "ADMIN":
            return Project.objects.all()
        return Project.objects.filter(worker=user)

    def perform_create(self, serializer):
        serializer.save(worker=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[IsWorker])
    def update_status(self, request, pk=None):
        project = self.get_queryset().get(pk=pk)
        status_value = request.data.get("status")
        if status_value not in ["PENDING", "IN_PROGRESS", "COMPLETED"]:
            return Response({"detail": "Invalid status"}, status=400)
        project.status = status_value
        project.save()
        serializer = self.get_serializer(project)
        return Response(serializer.data)
# Worker Register
class WorkerRegisterView(generics.CreateAPIView):
    serializer_class = WorkerRegisterSerializer

# Admin Register
class AdminRegisterView(generics.CreateAPIView):
    serializer_class = AdminRegisterSerializer

# Login
from rest_framework.views import APIView
from django.contrib.auth import authenticate

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        response = Response()
        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
        )
        response.data = {"user": UserSerializer(user).data}
        return response
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from rest_framework import serializers
from .models import User, Project
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom claims if needed
        token['role'] = user.role  # assuming your User model has 'role'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add extra user info in response
        data.update({
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": self.user.role,
        })
        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")

class ProjectSerializer(serializers.ModelSerializer):
    worker = UserSerializer(read_only=True)  # nested worker info

    class Meta:
        model = Project
        fields = ["id", "name", "description", "status", "worker"]
        read_only_fields = ["worker"]  # worker is set automatically


class WorkerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data, role="WORKER")
        return user

class AdminRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data, role="ADMIN", is_staff=True)
        return user

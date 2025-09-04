from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (("ADMIN", "Admin"), ("WORKER", "Worker"))
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="WORKER")

class Project(models.Model):
    worker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=(("PENDING", "Pending"), ("IN_PROGRESS", "In Progress"), ("COMPLETED", "Completed")), default="PENDING")

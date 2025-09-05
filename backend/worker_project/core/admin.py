from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Project

# Custom UserAdmin
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Role Info", {"fields": ("role",)}),
    )
    list_display = ("username", "email", "role", "is_staff", "is_active")
    list_filter = ("role", "is_staff", "is_active")
    search_fields = ("username", "email")
    ordering = ("username",)

# Register User model
admin.site.register(User, UserAdmin)

# Register Project model
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "worker", "status")
    list_filter = ("status", "worker")
    search_fields = ("name", "worker__username")

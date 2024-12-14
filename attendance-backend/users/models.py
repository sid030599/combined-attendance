from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('manager', 'Manager'),
        ('staff', 'Staff'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='staff')
    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_set",  # Avoid conflict
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",  # Avoid conflict
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions",
    )
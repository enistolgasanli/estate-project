import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager

class UserRoles(models.TextChoices):
    ADMIN = "admin", "Admin"
    MODERATOR = "moderator", "Moderator"
    USER = "user", "User"

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    role = models.CharField(max_length=10, choices=UserRoles.choices, default=UserRoles.USER, verbose_name="Role")
    email = models.EmailField(unique=True, blank=True, null=True)
    is_staff = models.BooleanField(default=False)


    objects = UserManager()
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
    
    @property
    def is_admin(self):
        return self.role == self.UserRoles.ADMIN
    
    @property
    def is_moderator(self):
        return self.role == self.UserRoles.MODERATOR
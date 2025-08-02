from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('counselor', 'Counselor'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    college = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    cumulative_gpa = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
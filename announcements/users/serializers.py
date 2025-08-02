# users/serializers.py

from rest_framework import serializers
from announcements.main.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    role = serializers.CharField(read_only=True)
    cumulative_gpa = serializers.FloatField(required=False, allow_null=True)
    college = serializers.CharField(required=False, allow_null=True)
    major = serializers.CharField(required=False, allow_null=True)
    department = serializers.CharField(required=False, allow_null=True)
    student_id = serializers.CharField(required=False, allow_null=True)
    employee_id = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = UserProfile
        fields = [
            'username',
            'email',
            'role',
            'cumulative_gpa',
            'college',
            'major',
            'department',
            'student_id',
            'employee_id'
        ]
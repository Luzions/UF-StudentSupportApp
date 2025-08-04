# users/serializers.py

from rest_framework import serializers
from announcements.main.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    role = serializers.CharField(read_only=True)
    cumulative_gpa = serializers.FloatField(required=False, allow_null=True)
    college = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    department = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'username',
            'email',
            'role',
            'cumulative_gpa',
            'college',
            'department',
            'first_name',
            'last_name',
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})

        request = self.context.get('request')
        is_self = request and request.user == instance.user
        is_counselor = hasattr(request.user, 'profile') and request.user.profile.role == 'counselor'

        if user_data:
            if is_self or is_counselor:
                # Only allow name updates by self or counselor
                for attr in ['first_name', 'last_name']:
                    if attr in user_data:
                        setattr(instance.user, attr, user_data[attr])
                instance.user.save()
            else:
                raise serializers.ValidationError("You do not have permission to update names.")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
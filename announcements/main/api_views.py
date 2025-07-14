from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from announcements.main.models import UserProfile  # import model correctly
import json

@csrf_exempt
def register_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST requests only'}, status=405)

    try:
        data = json.loads(request.body)

        # Extract all user + profile fields from frontend payload
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone = data.get('phone')
        role = data.get('role')
        college = data.get('college')
        department = data.get('department')

        # Basic uniqueness check
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        # Create basic User account
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        # Create matching UserProfile
        UserProfile.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            role=role,
            college=college,
            department=department
        )

        return JsonResponse({'message': 'User and profile created successfully.'})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': f'Registration failed: {str(e)}'}, status=500)


@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST requests only'}, status=405)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)

            try:
                user_profile = UserProfile.objects.get(user=user)
                return JsonResponse({
                    "message": "Login successful",
                    "role": user_profile.role,
                    "first_name": user_profile.first_name,
                    "full_name": user.get_full_name(),
                    "college": user_profile.college
                })

            except UserProfile.DoesNotExist:
                return JsonResponse({
                    "message": "Login successful",
                    "role": "unknown"
                })

        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({'error': f'Login failed: {str(e)}'}, status=500)


from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from announcements.main.models import UserProfile
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.contrib.auth import logout
from django.contrib.auth import get_user_model




import json
import random

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

        gpa = round(random.uniform(2.0, 4.0), 2) if role == 'student' else None
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
            department=department,
            cumulative_gpa=gpa
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


@api_view(['DELETE'])
def delete_user_profile(request, username):
    if not request.user.is_authenticated:
        return Response({'error': 'Unauthorized'}, status=403)

    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Authenticated user has no profile'}, status=404)

    if profile.role != 'counselor':
        return Response({'error': 'Insufficient privileges'}, status=403)

    try:
        target_user = get_object_or_404(User, username=username)
        target_user.delete()
        return Response({'message': f'User {username} deleted successfully'}, status=200)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)



def delete_own_profile(request):
    User = get_user_model()
    try:
        user_to_delete = User.objects.get(pk=request.user.pk)

        user_to_delete.delete()   #  Commit the deletion first
        logout(request)           #  THEN kill the session

        return JsonResponse({
            'message': 'Your account has been successfully deleted.',
            'redirect': '/login'
        }, status=200)

    except User.DoesNotExist:
        return JsonResponse({ 'error': 'User not found.' }, status=404)

    except Exception as e:
        print(f"🔥 Deletion error: {e}")
        return JsonResponse({ 'error': str(e) }, status=500)
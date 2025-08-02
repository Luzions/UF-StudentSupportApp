# 🔹 Imports
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from announcements.main.models import UserProfile
from .forms import CustomUserCreationForm
from .serializers import UserProfileSerializer
from django.db.models import Q



import random
import json

# 🔹 DRF ViewSet
class UserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    from django.db.models import Q

    def get_queryset(self):
        user = self.request.user

        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return UserProfile.objects.none()

        if profile.role == "counselor":
            return UserProfile.objects.filter(
                Q(role="student") | Q(user=user)
            ).order_by("last_name")
        else:
            return UserProfile.objects.filter(user=user)

# 🔹 Auth: Registration
@csrf_exempt  # Optional: consider removing if CSRF token is handled by frontend
def register_view(request):
    if request.user.is_authenticated:
        logout(request)

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name']
            )

            gpa = round(random.uniform(2.0, 4.0), 2) if data['role'] == 'student' else None

            UserProfile.objects.create(
                user=user,
                first_name=data['first_name'],
                last_name=data['last_name'],
                phone=data['phone'],
                role=data['role'],
                college=data['college'],
                department=data['department'],
                cumulative_gpa=gpa
            )

            login(request, user)
            return redirect('posts:list')
    else:
        form = CustomUserCreationForm()

    return render(request, "users/register.html", {"form": form})

# 🔹 Auth: Login
@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user = authenticate(request, username=data.get("username"), password=data.get("password"))

            if user:
                login(request, user)
                profile = user.profile

                return JsonResponse({
                    "message": "Login successful",
                    "role": profile.role,
                    "first_name": user.first_name,
                    "full_name": f"{user.first_name} {user.last_name}",
                    "college": profile.college
                }, headers={
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Credentials": "true"
                })

            return JsonResponse({"error": "Invalid credentials"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "GET not allowed"}, status=405)

# 🔹 Auth: Logout
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('posts:list')

# 🔹 User Profile editing for authenticated users
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request, user_id):
    try:
        profile = UserProfile.objects.get(user__id=user_id)

        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)


# 🔹 GPA Tracker
def gpa_tracker_view(request):
    if not request.user.is_authenticated:
        return redirect("login")

    profile = request.user.userprofile
    if profile.role == "student":
        return render(request, "gpa_tracker/student_view.html", {"gpa": profile.cumulative_gpa})

    elif profile.role == "counselor":
        students = UserProfile.objects.filter(role="student")
        selected_student_id = request.GET.get("student_id")
        selected_gpa = None

        if selected_student_id:
            selected_gpa = UserProfile.objects.get(id=selected_student_id).cumulative_gpa

        return render(request, "gpa_tracker/counselor_view.html", {
            "students": students,
            "selected_gpa": selected_gpa
        })


def whoami_view(request):
    user = request.user
    profile = getattr(user, "profile", None)

    response_data = {
        "username": user.username if user.is_authenticated else "unknown",
        "role": profile.role if profile else "unknown",
        "full_name": f"{user.first_name} {user.last_name}" if user.is_authenticated else "unknown",
        "college": profile.college if profile else "unknown"
    }

    response = JsonResponse(response_data)
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Credentials"] = "true"
    return response

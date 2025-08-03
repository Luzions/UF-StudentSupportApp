# 🔹 Imports
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework import viewsets, permissions

from rest_framework.response import Response

from announcements.main.models import UserProfile
from .forms import CustomUserCreationForm
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
import random
import json
from django.http import JsonResponse

def user_profiles(request):
    return JsonResponse({'status': 'ok', 'message': 'User profiles route active.'})


@csrf_exempt
def update_user_profile(request, user_id):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request method"}, status=405)

    try:
        data = json.loads(request.body)
        profile = UserProfile.objects.get(user__id=user_id)

        # Example updates (customize to match your fields)
        profile.role = data.get("role", profile.role)
        profile.college = data.get("college", profile.college)
        profile.save()

        return JsonResponse({"status": "Profile updated successfully"})
    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "UserProfile not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# 🔹 CSRF Endpoint
@csrf_protect
def csrf_check_view(request):
    return JsonResponse({"detail": "CSRF check passed"})

# 🔹 DRF ViewSet – NOW WRITABLE!
class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        print("PATCH received")
        print("Payload:", request.data)
        try:
            obj = self.get_object()
            serializer = self.get_serializer(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                print("✅ Save successful")
                return Response(serializer.data)
            else:
                print("❌ Serializer errors:", serializer.errors)
                return Response(serializer.errors, status=400)
        except Exception as e:
            print("Exception during PATCH:", str(e))
            import traceback
            traceback.print_exc()
            return Response({'error': str(e)}, status=500)

    def get_queryset(self):
        user = self.request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return UserProfile.objects.none()

        if profile.role == "counselor":
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=user)

# 🔹 Auth: Registration
@csrf_exempt
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

# 🔹 Debug Endpoint: Who am I?
def whoami_view(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = None

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

# 🔹 API: Delete User Profile
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

def delete_user(request, username):
    user_to_delete = get_object_or_404(User, username=username)

    # Permission logic: allow self-deletion or counselor-level deletion
    if request.user.username != username and request.user.profile.role != 'counselor':
        messages.error(request, "Unauthorized: You can only delete your own account.")
        return redirect('user_dashboard')  # Update this to your actual fallback view name

    # Delete the user
    user_to_delete.delete()
    print(f"{request.user.username} deleted {username}") # Logs who deleted whom if using manage.py runserver
    messages.success(request, f"User '{username}' deleted successfully.")

    # Redirect logic
    if request.user.username == username:
        # Student deleted their own account — send to login
        return redirect('login')
    else:
        # Counselor deleted someone else — send back to user list
        return redirect('user-profiles')
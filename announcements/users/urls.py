from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserProfileViewSet, gpa_tracker_view
from .views import whoami_view
from announcements.main.api_views import delete_user_profile, delete_own_profile
from .views import delete_user



app_name = 'users'

# Set up the router for user profiles
router = DefaultRouter()
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')

urlpatterns = [
    # Auth-related views
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path("gpa-tracker/", gpa_tracker_view, name="gpa_tracker"),
    path('whoami/', whoami_view, name='whoami'),

    # User profile management

    # Counselor deletes student profiles
    path('delete/<str:username>/', delete_user_profile, name='delete-user-counselor'),
    # Admin or system-level deletion
    path('delete-user/<str:username>/', delete_user, name='delete-user'),

    path('self-delete/',  delete_own_profile, name='self-delete'),
    path('delete-own-profile/', delete_own_profile, name='delete_own_profile'),

    # API routes handled by the router
    path('', include(router.urls)),
]
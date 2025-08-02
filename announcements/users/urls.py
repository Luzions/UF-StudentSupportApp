from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import UserProfileViewSet, gpa_tracker_view

from .views import whoami_view



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


    # API routes handled by the router
    path('', include(router.urls)),
]
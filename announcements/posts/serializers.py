# announcements/posts/urls.py
from django.urls import path
from .api_views import announcements_list

urlpatterns = [
    path('api/posts/', announcements_list),
]
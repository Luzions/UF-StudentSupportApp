"""
URL configuration for Engineering_Demo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from django.conf import settings
from django.views.static import serve
from . import api_views
from announcements.users.views import csrf_check_view
from django.urls import path
from .api_views import delete_user_profile, delete_own_profile


urlpatterns = [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
    path('admin/', admin.site.urls),
    #path('', views.homepage, name='homepage'),
    #path('about/', views.about, name='about'),
    path('posts/', include('announcements.posts.urls')),
    path('users/', include('announcements.users.urls')),
    path('api/register/', api_views.register_user, name='register'),
    path('api/login/', api_views.login_user, name='login'),
    path('csrf-check/', csrf_check_view),
    path('profiles/delete/<username>/', delete_user_profile),
    path('profiles/self-delete/', delete_own_profile),


]

#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
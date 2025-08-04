# Access Control

from django.http import HttpResponseForbidden

def counselor_only(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden("You must be logged in.")
        if hasattr(request.user, 'userprofile') and request.user.userprofile.role == 'counselor':
            return view_func(request, *args, **kwargs)
        return HttpResponseForbidden("Access denied. Counselors only.")
    return _wrapped_view
# from django.http import HttpResponse
from django.shortcuts import render

# Testing if it works in the Home Page and About page? Yes did
def homepage(request):
    return render(request, 'home.html')
    # return HttpResponse("Hello, world. You're at the Home page.") Testing


def about(request):
    return render(request, 'about.html')
    # return HttpResponse("Hello, world. You're at the About page.") Testing
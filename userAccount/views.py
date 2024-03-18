from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
# Create your views here.


def loginPage(request):
    
    return render(request, 'login.html')


"""
URL configuration for covidVisionX project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path
from userAccount import views as userAccount


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', userAccount.loginPage, name='login'),
    path('login/', userAccount.loginAuth, name='loginAuth'),
    path('logout/', userAccount.logout, name='logout'),
    path('patientReport/', userAccount.reportView, name='reportView'),
    path('patientProfile/', userAccount.profileView, name='profileView'),
    #path('patientEditProfile/', userAccount.updateDetails, name='updateDetails'),  #to update own details
    path('updateDetails/', userAccount.updateDetails, name='updateDetails'),
    path('updateUserDetails/<int:pk>/', userAccount.updateUserDetails, name='updateUserDetails'),  #to update another person details
    path('listusers/', userAccount.list_users, name='listusers'),
]

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
from django.urls import include, path

from accessControl import views as accessControl
from userAccount import views as userAccount
from userAccount.admin import system_admin_site

urlpatterns = [
    path('admin/', admin.site.urls),
    path('system-admin/', system_admin_site.urls),
    path('', userAccount.loginPage, name='login'),

    path('login/', userAccount.loginAuth, name='loginAuth'),
    path('logout/', userAccount.logout, name='logout'),
    path('patientReport/', userAccount.reportView, name='reportView'),
    path('patientProfile/', userAccount.getDetails, name='getDetails'),
    path('patientEditProfile/', userAccount.editProfileView,
         name='editProfileView'),                                                               #for patient to view edit own details page          
    path('updateDetails/', userAccount.updateDetails, name='updateDetails'),                    #for patient to update own details
    path('updateUserDetails/<int:pk>/', userAccount.updateUserDetails,                          #for system admin to update another person details!!!!!!!!!! (linked to below)
         name='updateUserDetails'),  # to update another person details
    path('listusers/', userAccount.list_users, name='listusers'),                               #for system admin to view list of users                   


    path('sysUserAccList/', userAccount.sysUserAccList, name='sysUserAccList'),                 #for system admin to view list of users
    path('sysProfileView/', userAccount.getDetails, name='getDetails'),                         #for system admin to view own details
    path('sysEditProfileView/', userAccount.sysEditProfileView, name='sysEditProfileView'),     #for system admin to view edit own details page
    path('accDetails/', userAccount.accDetails, name='accDetails'),                             #for system admin to view specific user details supposed to have pk !!!!!!!!!!! 
    path('sysEditAccDetails/', userAccount.sysEditAccDetails, name='sysEditUserDetails'),       #for system admin to edit another person details supposed to have pk !!!!!!!!!!!
    path('sysUpdateDetails/', userAccount.updateDetails, name='updateDetails'),                 #for system admin to update own details

    path('docProfileView/', userAccount.getDetails, name='getDetails'),                         #for doctor to view own details
    path('docEditProfileView/', userAccount.docEditProfileView, name='docEditProfileView'),     #for doctor to view edit own details page
    path('docUploadXRay/', userAccount.docUploadXRay, name='docUploadXRay'),                    #for doctor to upload xray image page
    path('docNonUpdatedReport/', userAccount.docNonUpdatedReport, name='docNonUpdatedReport'),  #for doctor to view non updated reports of patients
    path('docUpdateDetails/', userAccount.updateDetails, name='updateDetails'),                 #for doctor to update own details
    path('docReportView/', userAccount.docReportView, name='docReportView'),                    #for doctor to view reports that are uploaded to patients

    #path('login/', accessControl.LoginView.as_view(), name='loginAuth'),
    #path('logout/', accessControl.LogoutView.as_view(), name='logout'),
]

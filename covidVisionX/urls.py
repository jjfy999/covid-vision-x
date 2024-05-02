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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from accessControl import views as accessControl
from deepLearningModel import views as deepLearningModel
from userAccount import views as userAccount
from userAccount.admin import system_admin_site

urlpatterns = [
    path('admin/', admin.site.urls),
    path('system-admin/', system_admin_site.urls),
    path('', userAccount.loginPage, name='login'),

    path('login/', userAccount.loginAuth, name='loginAuth'),
    path('logout/', userAccount.logout, name='logout'),
    path('register/', userAccount.createUser,
         name='createUser'),  # for patient to register
    path('patientReport/', deepLearningModel.reportView, name='reportView'),
    path('patientProfile/', userAccount.getDetails, name='getDetails'),
    path('patientEditProfile/', userAccount.editProfileView,
         name='editProfileView'),  # for patient to view edit own details page
    path('updateDetails/', userAccount.updateDetails,
         name='updateDetails'),  # for patient to update own details
    path('updateUserDetails/<int:pk>/', userAccount.updateUserDetails,  # for system admin to update another person details!!!!!!!!!! (linked to below)
         name='updateUserDetails'),  # to update another person details
     path('testPatient/<int:pk>/', userAccount.testPatient, name='testPatient'),  # testing to see patient details



    # for system admin to view list of users
    path('sysUserAccList/', userAccount.listUsers, name='sysUserAccList'),
    # for system admin to view own details
    path('sysProfileView/', userAccount.getDetails, name='getDetails'),
    # for system admin to view edit own details page
    path('sysEditProfileView/', userAccount.sysEditProfileView,
         name='sysEditProfileView'),
    # for system admin to view specific user details
    path('accDetails/<int:pk>/', userAccount.getUserDetails, name='getUserDetails'),
    path('sysEditAccDetails/<int:pk>/', userAccount.sysEditAccDetails,
         name='sysEditUserDetails'),  # for system admin to edit another person details
    # for system admin to update own details
    path('sysUpdateDetails/', userAccount.updateDetails, name='updateDetails'),
    # for system admin to search for a doctor or patient
    path('sysSearchUser/<int:pk>/', userAccount.searchUser, name='searchUser'),
    path('sysDeleteUser/<int:pk>/', userAccount.deleteUser,
         name='deleteUser'),  # for system admin to delete a user
    # for system admin to create a user
    path('sysCreateUser/', userAccount.createUser, name='createUser'),

    path('docSearchUser/<int:pk>/', userAccount.searchUser,
         name='searchUser'),  # for doctor to search for a patient
    # for doctor to view list of patients (waiting for UI)
    path('docPatientAccList/', userAccount.listPatients, name='docUserAccList'),
    path('docProfileView/', userAccount.getDetails,
         name='getDetails'),  # for doctor to view own details
    path('docEditProfileView/', userAccount.docEditProfileView,
         name='docEditProfileView'),  # for doctor to view edit own details page
    # for doctor to upload xray image page
    path('docUploadXRay/', userAccount.docUploadXRay, name='docUploadXRay'),
    path('docNonUpdatedReport/', deepLearningModel.listNonUploadedReports,
         name='docListReports'),  # for doctor to view non updated reports of patients
    path('docUpdateDetails/', userAccount.updateDetails,
         name='updateDetails'),  # for doctor to update own details
    # for doctor to view reports that are uploaded to patients
    path('docReportView/', deepLearningModel.listUploadedReports,
         name='docReportView'),
    # for doctor to view xray image result (for testing)
    path('docXrayResult/', deepLearningModel.analyze_image, name='analyze_image'),
    # for doctor to view list of all reports (for testing)
    path('docListAllReports/', deepLearningModel.listAllReports,
         name='docListAllReports'),
    path('uploadReport/', deepLearningModel.uploadReport, name='uploadReport'),
    path('deleteReport/', deepLearningModel.deleteReport, name='deleteReport'),

    path('api/', include('accessControl.urls'))
    # path('login/', accessControl.LoginView.as_view(), name='loginAuth'),
    # path('logout/', accessControl.LogoutView.as_view(), name='logout'),



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

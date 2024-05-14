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


    #For Patients !!!!!!!!!!!!!!!!!!
    # for patient to register account
    path('register/', userAccount.createUser, name='createUser'),
     # for patient to view all their reports
    path('patientReport/', deepLearningModel.reportView, name='reportView'),
     # for patient to view own profile
    path('patientProfile/', userAccount.getDetails, name='getDetails'),
    # for patient to update own details
    path('updateDetails/', userAccount.updateDetails, name='updateDetails'),  



    #For System Admin !!!!!!!!!!!!!!!!!! 
    # for system admin to view list of users
    path('sysUserAccList/', userAccount.listUsers, name='sysUserAccList'),
    # for system admin to view own details
    path('sysProfileView/', userAccount.getDetails, name='getDetails'),
    # for system admin to view specific user details
    path('accDetails/<int:pk>/', userAccount.getUserDetails, name='getUserDetails'),
    # for system admin to update own details
    path('sysUpdateDetails/', userAccount.updateDetails, name='updateDetails'),
    # for system admin to search for a doctor or patient
    path('sysSearchUser/<int:pk>/', userAccount.searchUser, name='searchUser'),
    # for system admin to delete a user
    path('sysDeleteUser/<int:pk>/', userAccount.deleteUser, name='deleteUser'),  
    # for system admin to create a user
    path('sysCreateUser/', userAccount.createUser, name='createUser'),
    # for system admin to update another person details
    path('updateUserDetails/<int:pk>/', userAccount.updateUserDetails, name='updateUserDetails'), 



    #For Doctors !!!!!!!!!!!!!!!!!!
    # for doctor to search for a patient
    path('docSearchUser/<int:pk>/', userAccount.searchUser, name='searchUser'),  
    # for doctor to view list of patients 
    path('docPatientAccList/', userAccount.listPatients, name='docUserAccList'),
    # for doctor to view own details
    path('docProfileView/', userAccount.getDetails, name='getDetails'), 
    # for doctor to view all non updated reports of patients
    path('docNonUploadedReports/', deepLearningModel.listNonUploadedReports, name='docListReports'),
    # for doctor to update own details
    path('docUpdateDetails/', userAccount.updateDetails, name='updateDetails'),  
    # for doctor to view all reports that are uploaded to patients
    path('docUploadedReports/', deepLearningModel.listUploadedReports, name='docUploadedReports'),
    # for doctor to view list of all reports (for testing) 
    path('docListAllReports/', deepLearningModel.listAllReports, name='docListAllReports'),
    # for doctor to upload report to patient
    path('uploadReport/', deepLearningModel.uploadReport, name='uploadReport'),
    # for doctor to delete report
    path('deleteReport/<int:pk>/', deepLearningModel.deleteReport, name='deleteReport'),
    # for doctor to upload images for ML prediction
    path('predictImage/', deepLearningModel.predict, name='predictImage'),
    # for doctor to view 1 specific report
    path('docShowReport/<int:pk>/', deepLearningModel.showReport, name='showReport'),



    #For Researchers !!!!!!!!!!!!!!!!!!
    # for researcher to upload model to S3
    path('researcherUploadModel/',deepLearningModel.uploadModel, name='uploadModel'),
    # for researcher to delete model from S3
    path('researcherDeleteModel/',deepLearningModel.deleteModel, name='deleteModel'), 
    # for researcher to view list of models    
    path('docListModels/', deepLearningModel.listModels, name='listModels'),


    path('api/', include('accessControl.urls'))
    # path('login/', accessControl.LoginView.as_view(), name='loginAuth'),
    # path('logout/', accessControl.LogoutView.as_view(), name='logout'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

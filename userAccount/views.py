from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import (HttpResponse, HttpResponseBadRequest,
                         HttpResponseNotFound, HttpResponseRedirect,
                         JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render, reverse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from userAccount.serializers import (DoctorSysAdminGetDetailsSerializer,
                                     DoctorSysAdminSerializer,
                                     DoctorSysAdminUpdateSerializer,
                                     PatientGetDetailsSerializer,
                                     PatientSerializer,
                                     PatientUpdateSerializer)

from .models import Doctor, Patient, SystemAdmin

# Create your views here.


def loginPage(request):

    return render(request, 'login.html')


def loginAuth(request):  # only a temporary login function for testing

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            print(type(user))
            if user.role == 'doctor':
                return redirect('docUploadXRay')
            elif user.role == 'patient':
                return redirect('reportView')
            elif user.role == 'system_admin':
                return redirect('sysUserAccList')
            else:
                return HttpResponse('Who are you')
        else:
            return HttpResponse('Invalid credentials')



def reportView(request):    
    return render(request, 'Report.html')


def profileView(request):
    return render(request, 'PatientProfile.html')


def editProfileView(request):
    return render(request, 'EditPatientProfile.html')

def sysUserAccList(request):                
    return render(request, 'UserAcc.html')

def sysProfileView(request):
    return render(request, 'SysadminProfile.html')

def sysEditProfileView(request):
    return render(request, 'EditSysadminProfile.html')

def accDetails(request):
    return render(request, 'AccDetail.html')

def sysEditAccDetails(request,pk):
    return render(request, 'EditAcc.html', {'pk': pk})


def docEditProfileView(request):
    return render(request, 'EditDoctorProfile.html')

def docUploadXRay(request):
    return render(request, 'uploadxray.html')

def docNonUpdatedReport(request):
    return render(request, 'nonUpdatedReport.html')

def docReportView(request):
    return render(request, 'DocReport.html')


def logout(request):
    auth_logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')



@login_required
def getDetails(request):                                                             #for users to view own details
    user=request.user
    print("User role:", user.role)
    if user.role == 'patient':
        serialized_User = PatientGetDetailsSerializer(user)
        context = {'user': serialized_User.data}
        return render(request, 'PatientProfile.html', context)
    
    elif user.role == 'doctor':
        serialized_User = DoctorSysAdminGetDetailsSerializer(user)
        context = {'user': serialized_User.data}
        return render(request, 'DoctorProfile.html', context)
    
    elif user.role == 'system_admin':
        serialized_User = DoctorSysAdminGetDetailsSerializer(user)    
        context = {'user': serialized_User.data}
        return render(request, 'SysadminProfile.html', context)
    
    else:    
        return HttpResponse('User not found')
    


def getUserDetails(request, pk):                                            #for system admin to view specific user details 
    user = None
    # Try to find the user in the Doctor model
    doctor = Doctor.objects.filter(pk=pk)
    if doctor.exists():
        user=doctor.first()
        serializer = DoctorSysAdminGetDetailsSerializer(user)
        
    # If not found in Doctor model, try the Patient model
    if user is None:
        patient = Patient.objects.filter(pk=pk)
        if patient.exists():
            user=patient.first()
            serializer = PatientGetDetailsSerializer(user)
            
    # If not found in Patient model, try the SystemAdmin model
    if user is None:
        system_admin = SystemAdmin.objects.filter(pk=pk)
        if system_admin.exists():
            user=system_admin.first()
            serializer = DoctorSysAdminGetDetailsSerializer(user)
            
    if user is None:
        return HttpResponseNotFound("User not found")

    return render(request, 'AccDetail.html', {'user': serializer.data})


    
    
@api_view(['GET'])
def listUsers(request):                                                               #for system admin to view list of users
    # Serialize patients
    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    # Serialize doctors
    doctors = Doctor.objects.all()
    doctor_serializer = DoctorSysAdminSerializer(doctors, many=True)

    # Serialize system admins
    system_admins = SystemAdmin.objects.all()
    system_admin_serializer = DoctorSysAdminSerializer(
        system_admins, many=True)

    # Combine the serialized data
    users_data = {
        'patients': patient_serializer.data,
        'doctors': doctor_serializer.data,
        'system_admins': system_admin_serializer.data
    }

    return render(request, 'Useracc.html', {'users_data': users_data})



@login_required
def updateDetails(request):                                                       #for users to update own details 

    user = request.user
    
    # Check if the user is a Doctor or a SystemAdmin
    if user.role == 'doctor' or user.role == 'system_admin':
        serializer = DoctorSysAdminUpdateSerializer(user, data=request.POST)
    elif user.role == 'patient':
        serializer = PatientUpdateSerializer(user, data=request.POST)
    else:
        messages.error(request, "Invalid user type")
        return HttpResponseBadRequest("Invalid user type")

    if serializer.is_valid():
        serializer.save()
        messages.success(request, "Details updated successfully!")
    else:
        messages.error(request, "Failed to update details")
    
    return redirect('getDetails')


@login_required
def updateUserDetails(request, pk):                                                          #for system admin to update another person details
    user = None

    doctor = Doctor.objects.filter(pk=pk)
    if doctor.exists():
        user=doctor.first()
        serializer = DoctorSysAdminUpdateSerializer(user,data=request.POST)
                                                    
    if user is None:
        patient = Patient.objects.filter(pk=pk)
        if patient.exists():
            user=patient.first()
            serializer = PatientUpdateSerializer(user,data=request.POST)
            
    # If not found in Patient model, try the SystemAdmin model
    if user is None:
        system_admin = SystemAdmin.objects.filter(pk=pk)
        if system_admin.exists():
            user=system_admin.first()
            serializer = DoctorSysAdminUpdateSerializer(user,data=request.POST)

    if serializer.is_valid():
        serializer.save()
        return redirect(reverse('getUserDetails', kwargs={'pk': pk}))
    else:
        # Return errors if serializer is not valid
        return Response(serializer.errors, status=400)  

@login_required 
def deleteUserAccount(request, pk):                                                          #for system admin to delete another person account
    user = None

    doctor = Doctor.objects.filter(pk=pk)
    if doctor.exists():
        user=doctor.first()
                                                    
    if user is None:
        patient = Patient.objects.filter(pk=pk)
        if patient.exists():
            user=patient.first()
        
    user.delete()        
    return redirect('sysUserAccList')        


    

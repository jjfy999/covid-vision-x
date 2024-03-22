from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import (HttpResponse, HttpResponseBadRequest,
                         HttpResponseNotFound, HttpResponseRedirect,
                         JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render
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

def sysEditAccDetails(request):
    return render(request, 'EditAcc.html')


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
    
    
@api_view(['GET'])
def list_users(request):                                                               #for system admin to view list of users
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

    return JsonResponse(users_data, json_dumps_params={'indent': 2})



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



@api_view(['POST'])
def updateUserDetails(request, pk):                                                          #for system admin to update another person details

    # Retrieve the user object from Doctor table
    try:
        user = get_object_or_404(Doctor, pk=pk)
        user_type = "Doctor"
        serializer = DoctorSysAdminUpdateSerializer(user, data=request.data)
    except Doctor.DoesNotExist:
        # If not found in Doctor table, try to get from Patient table
        try:
            user = get_object_or_404(Patient, pk=pk)
            user_type = "Patient"
            serializer = PatientUpdateSerializer(user, data=request.data)
        except Patient.DoesNotExist:
            # If not found in Patient table, try to get from SystemAdmin table
            try:
                user = get_object_or_404(SystemAdmin, pk=pk)
                user_type = "SystemAdmin"
                serializer = DoctorSysAdminUpdateSerializer(
                    user, data=request.data)
            except SystemAdmin.DoesNotExist:
                # If not found in any table, return 404
                return HttpResponseNotFound("User not found")

    if serializer.is_valid():
        serializer.save()
        return Response({'message': f'Details updated successfully for {user_type}'})
    else:
        # Return errors if serializer is not valid
        return Response(serializer.errors, status=400)

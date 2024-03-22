from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import (HttpResponse, HttpResponseBadRequest, HttpResponseNotFound,
                         HttpResponseRedirect, JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from userAccount.serializers import (DoctorSysAdminSerializer,
                                     DoctorSysAdminUpdateSerializer,
                                     PatientSerializer, PatientUpdateSerializer)

from .models import Doctor, Patient, SystemAdmin
from django.contrib.auth import logout as auth_logout


# Create your views here.


def loginPage(request):

    return render(request, 'login.html')


def loginAuth(request):  # only a temporary login function for testing

    if request.method == 'POST':
        username = request.POST['uname']
        password = request.POST['psw']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            print(type(user))
            if user.role == 'doctor':
                return HttpResponse('Logged in successfully, will link UI later')
            elif user.role == 'patient':
                return redirect('reportView')
            elif user.role == 'system_admin':
                return HttpResponse('Logged in successfully, will link UI later')
            else:
                return HttpResponse('Who are you')
        else:
            return HttpResponse('Invalid credentials')

def reportView(request):
    return render(request, 'Report.html')

def profileView(request):
    return render(request, 'Profile.html')

def editProfileView(request):
    return render(request, 'EditProfile.html')

def logout(request):
    auth_logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')

@api_view(['GET'])
def list_users(request):
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

@api_view(['POST'])
#@login_required
def updateDetails(request):
    
    user = request.user
        
    # Check if the user is a Doctor or a SystemAdmin
    if isinstance(user, Doctor) or isinstance(user, SystemAdmin):
        serializer = DoctorSysAdminSerializer(user, data=request.data)
    elif isinstance(user, Patient):
        serializer = PatientSerializer(user, data=request.data)
    else:
        messages.error(request, "Invalid user type")
        return HttpResponseBadRequest("Invalid user type")
            
    if serializer.is_valid():
        serializer.save()
        messages.success(request, "Details updated successfully!")
    else:
        messages.error(request, "Failed to update details")
        return render(request, 'update_details.html')  # Render the update details form



@api_view(['POST'])
def updateUserDetails(request, pk):

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
                serializer = DoctorSysAdminUpdateSerializer(user, data=request.data)
            except SystemAdmin.DoesNotExist:
                # If not found in any table, return 404
                return HttpResponseNotFound("User not found")

    if serializer.is_valid():
        serializer.save()
        return Response({'message': f'Details updated successfully for {user_type}'})
    else:
        return Response(serializer.errors, status=400)  # Return errors if serializer is not valid



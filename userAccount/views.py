from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import (HttpResponse, HttpResponseBadRequest,
                         HttpResponseNotFound, HttpResponseRedirect,
                         JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render, reverse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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
    return render(request, 'templates/SysadminProfile.html')


def sysEditProfileView(request):
    return render(request, 'EditSysadminProfile.html')


def accDetails(request):
    return render(request, 'AccDetail.html')


def sysEditAccDetails(request, pk):
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
def getDetails(request):  # for users to view own details
    user = request.user
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


'''
@api_view(['GET']) # yc need to look at again
@permission_classes([IsAuthenticated])
def getDetails(request):
    user = request.user
    print("User role:", user.role)
    
    if user.role == 'patient':
        serializer = PatientGetDetailsSerializer(user)
    elif user.role == 'doctor' or user.role == 'system_admin':
        serializer = DoctorSysAdminGetDetailsSerializer(user)
    else:
        return JsonResponse({'error': 'User role is not recognized'}, status=404)

    return JsonResponse(serializer.data, safe=False, json_dumps_params={'indent': 2})

'''


def getUserDetails(request, pk):  # for system admin to view specific user details
    try:
        doctor = Doctor.objects.get(account_id=pk)
        serializer = DoctorSysAdminGetDetailsSerializer(doctor)
    except Doctor.DoesNotExist:
        doctor = None

    if doctor is None:
        try:
            patient = Patient.objects.get(account_id=pk)
            serializer = PatientGetDetailsSerializer(patient)
        except Patient.DoesNotExist:
            patient = None

    # If not found in Patient model, try the SystemAdmin model
    if doctor is None and patient is None:
        try:
            system_admin = SystemAdmin.objects.get(account_id=pk)
            serializer = DoctorSysAdminGetDetailsSerializer(system_admin)
        except SystemAdmin.DoesNotExist:
            return HttpResponseNotFound("User not found")

    return render(request, 'AccDetail.html', {'user': serializer.data})
    # return JsonResponse(serializer.data, json_dumps_params={'indent': 2})


# @api_view(['GET'])
def listUsers(request):  # for system admin to view list of users
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

    users_data = {
        'patients': patient_serializer.data,
        'doctors': doctor_serializer.data,
        'system_admins': system_admin_serializer.data
    }
    return render(request, 'UserAcc.html', {'users_data': users_data})
    # return JsonResponse(users_data, json_dumps_params={'indent': 2})


@api_view(['GET'])
# for doctor to view list of patients !! have not updated url, waiting for UI
def listPatients(request):
    # Serialize patients
    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    users_data = {'patients': patient_serializer.data}
    return render(request, 'UserAcc.html', {'users_data': users_data})


@login_required
def updateDetails(request):  # for users to update own details

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
def updateUserDetails(request, pk):  # for system admin to update another person details
    try:
        doctor = Doctor.objects.get(account_id=pk)
        serializer = DoctorSysAdminUpdateSerializer(doctor, data=request.POST)
    except Doctor.DoesNotExist:
        doctor = None

    if doctor is None:
        try:
            patient = Patient.objects.get(account_id=pk)
            serializer = PatientUpdateSerializer(patient, data=request.POST)
        except Patient.DoesNotExist:
            patient = None

    # If not found in Patient model, try the SystemAdmin model
    if doctor is None and patient is None:
        try:
            system_admin = SystemAdmin.objects.get(account_id=pk)
            serializer = DoctorSysAdminUpdateSerializer(
                system_admin, data=request.POST)
        except SystemAdmin.DoesNotExist:
            return HttpResponseNotFound("User not found")

    if serializer.is_valid():
        serializer.save()
        return redirect(reverse('getUserDetails', kwargs={'pk': pk}))
    else:
        # Return errors if serializer is not valid
        return Response(serializer.errors, status=400)


'''
@login_required
def deleteUserAccount(request, pk):                                                                 #for system admin to delete user account
    try:
        user = Doctor.objects.get(account_id=pk)
    except Doctor.DoesNotExist:
        user = None

    if user is None:
        try:
            user = Patient.objects.get(account_id=pk)
        except Patient.DoesNotExist:
            user = None

    if user is not None:
        user.delete()
    
    return redirect('sysUserAccList')


     

    

def searchUser(request):                                                                        #for system admin to search for user && for doctor to search for patient
    account_id = request.POST.get('account_id', None)
    
    if account_id:
        try:
            if request.user.role == 'doctor':
                searchUser = Patient.objects.get(account_id=account_id)
                serializer = PatientGetDetailsSerializer(searchUser)
                return render(request, 'UserAcc.html', {'user': serializer.data})
            else:
                searchUser = Patient.objects.get(account_id=account_id)
                serializer = PatientGetDetailsSerializer(searchUser)
                if not searchUser:  # If patient not found, search for doctor
                    searchUser = Doctor.objects.get(account_id=account_id)
                    serializer = DoctorSysAdminGetDetailsSerializer(searchUser)
                    return render(request, 'UserAcc.html', {'user': serializer.data})
        except (Patient.DoesNotExist, Doctor.DoesNotExist):
            return HttpResponseBadRequest("Invalid user type")
        

    return render(request, 'UserAcc.html')
'''

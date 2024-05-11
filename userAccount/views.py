from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.http import (HttpResponse, HttpResponseBadRequest,
                         HttpResponseNotFound, HttpResponseRedirect,
                         JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render, reverse
from django.urls import reverse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from userAccount.serializers import (DoctorSysAdminGetDetailsSerializer,
                                     DoctorSysAdminSerializer,
                                     DoctorSysAdminUpdateSerializer,
                                     PatientGetDetailsSerializer,
                                     PatientSerializer,
                                     PatientUpdateSerializer)

from .models import Doctor, Patient, Researcher, SystemAdmin

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
                redirect_url = reverse('reportView') + \
                    f'?account_id={user.account_id}'
                return redirect(redirect_url)
            elif user.role == 'system_admin':
                return redirect('sysUserAccList')
            else:
                return HttpResponse('Who are you')
        else:
            return HttpResponse('Invalid credentials')


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


def logout(request):
    auth_logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')


@api_view(['GET'])  # for users to view own details
# @permission_classes([IsAuthenticated])
def getDetails(request):
    user = request.user
    print("User role:", user.role)

    if user.role == 'patient':
        patient_instance = Patient.objects.get(
            pk=user.id)  # Retrieve patient instance
        serializer = PatientSerializer(patient_instance)
    elif user.role == 'doctor' or user.role == 'system_admin' or user.role == 'researcher':
        serializer = DoctorSysAdminSerializer(user)
    else:
        return JsonResponse({'error': 'User role is not recognized'}, status=404)

    return JsonResponse(serializer.data, safe=False, json_dumps_params={'indent': 2}, status=200)


# Postman tested
@api_view(['GET'])
def getUserDetails(request, pk):  # for system admin to view specific user details
    try:
        doctor = Doctor.objects.get(pk=pk)
        serializer = DoctorSysAdminGetDetailsSerializer(doctor)
        return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, status=200)
    except Doctor.DoesNotExist:
        pass

    try:
        patient = Patient.objects.get(pk=pk)
        serializer = PatientGetDetailsSerializer(patient)
        return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, status=200)
    except Patient.DoesNotExist:
        pass

    try:
        researcher = Researcher.objects.get(pk=pk)
        serializer = DoctorSysAdminGetDetailsSerializer(researcher)
        return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, status=200)
    except Researcher.DoesNotExist:
        pass

    try:
        system_admin = SystemAdmin.objects.get(pk=pk)
        serializer = DoctorSysAdminGetDetailsSerializer(system_admin)
        return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, status=200)
    except SystemAdmin.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)


# Postman tested
@api_view(['GET'])
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

    researchers = Researcher.objects.all()
    researcher_serializer = DoctorSysAdminSerializer(researchers, many=True)

    users_data = {
        'patients': patient_serializer.data,
        'doctors': doctor_serializer.data,
        'system_admins': system_admin_serializer.data,
        'researchers': researcher_serializer.data
    }
    return JsonResponse(users_data, json_dumps_params={'indent': 2}, status=200)


# Postman tested
# for doctor to view list of patients
@api_view(['GET'])
def listPatients(request):
    # Serialize patients
    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    users_data = {'patients': patient_serializer.data}
    return JsonResponse(users_data, json_dumps_params={'indent': 2}, status=200)


@api_view(['PUT'])  # Update should be a PUT request
def updateDetails(request):  # for users to update own details

    user = request.user

    # Check if the user is a Doctor or a SystemAdmin
    if user.role == 'doctor' or user.role == 'system_admin' or user.role == 'researcher':
        serializer = DoctorSysAdminUpdateSerializer(user, data=request.data)
    elif user.role == 'patient':
        serializer = PatientUpdateSerializer(user, data=request.data)
    else:
        return JsonResponse({"error": "Invalid user type"}, status=400)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, safe=False, status=200)
    else:
        return JsonResponse(serializer.errors, status=400)

# Postman tested


@api_view(['POST'])
# for system admin to update another person's details
def updateUserDetails(request, pk):
    try:
        doctor = Doctor.objects.get(pk=pk)
        serializer = DoctorSysAdminUpdateSerializer(doctor, data=request.data)
    except Doctor.DoesNotExist:
        doctor = None

    if doctor is None:
        try:
            patient = Patient.objects.get(pk=pk)
            serializer = PatientUpdateSerializer(patient, data=request.data)
        except Patient.DoesNotExist:
            patient = None

    if doctor is None and patient is None:
        try:
            researcher = Researcher.objects.get(pk=pk)
            serializer = DoctorSysAdminUpdateSerializer(
                researcher, data=request.data)
        except Researcher.DoesNotExist:
            researcher = None

    if doctor is None and patient is None and researcher is None:
        return JsonResponse({"error": "User not found"}, status=404)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'message': 'User updated successfully.'}, status=200)
    else:
        # Return errors if serializer is not valid
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
# for doctor to search for a patient, and for system admin to search for everyone
def searchUser(request, pk):
    if pk:
        try:
            if request.user.role == 'doctor':
                searchUser = Patient.objects.get(pk=pk)
                serializer = PatientSerializer(searchUser)
            else:
                try:
                    searchUser = Patient.objects.get(pk=pk)
                    serializer = PatientSerializer(searchUser)
                except Patient.DoesNotExist:
                    try:
                        searchUser = Doctor.objects.get(pk=pk)
                        serializer = DoctorSysAdminSerializer(searchUser)
                    except Doctor.DoesNotExist:
                        try:
                            searchUser = Researcher.objects.get(pk=pk)
                            serializer = DoctorSysAdminSerializer(searchUser)
                        except Researcher.DoesNotExist:
                            return JsonResponse({"error": "User not found"}, status=400)

            return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, status=200)
        except (Patient.DoesNotExist, Doctor.DoesNotExist, Researcher.DoesNotExist):
            return JsonResponse({"error": "User not found"}, status=400)
    return JsonResponse({"error": "User not found"}, status=400)


# Postman tested
@api_view(['DELETE'])
def deleteUser(request, pk):  # for system admin to delete a user
    user = None

    try:
        user = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        pass

    if user is None:
        try:
            user = Patient.objects.get(pk=pk)
        except Patient.DoesNotExist:
            pass

    if user is None:
        try:
            user = Researcher.objects.get(pk=pk)
        except Researcher.DoesNotExist:
            pass

    if user is not None:
        user.delete()
        return JsonResponse({'message': 'User deleted successfully.'}, status=200)
    else:
        return JsonResponse({'error': 'User not found.'}, status=404)


# Postman tested
@api_view(['POST'])
# for patient to register and for system admin to create a user
def createUser(request):
    if request.method == 'POST':
        name = request.data.get('name')
        phone_number = request.data.get('phone_number')
        email = request.data.get('email')
        username = request.data.get('username')
        password = make_password(request.data.get('password'))
        role = request.data.get('role')

        # Create the user based on the role
        if role == 'patient':
            status = 'Not_Applicable'  # Set default status for patient
            user = Patient.objects.create_user(
                username=username, password=password, email=email, name=name, phone_number=phone_number, role=role, status=status)

        elif role == 'doctor':
            user = Doctor.objects.create_user(
                username=username, password=password, email=email, name=name, phone_number=phone_number, role=role)

        elif role == 'system_admin':
            user = SystemAdmin.objects.create_user(
                username=username, password=password, email=email, name=name, phone_number=phone_number, role=role)

        elif role == 'researcher':
            user = Researcher.objects.create_user(
                username=username, password=password, email=email, name=name, phone_number=phone_number, role=role)

        else:
            # Handle invalid role
            return JsonResponse({'error': 'Invalid role'}, status=400)

        return JsonResponse({'message': 'User created successfully.'}, status=201)

    else:
        # Handle non-POST request
        return JsonResponse({'error': 'User not created.'}, status=400)


def testPatient(request, pk):
    patient = Patient.objects.get(pk=pk)
    serializer = PatientSerializer(patient)
    return JsonResponse(serializer.data, json_dumps_params={'indent': 2})

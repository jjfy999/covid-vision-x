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


@api_view(['GET'])  # for users to view own details
def getDetails(request):
    user = request.user
    if user.role == 'patient':
        patient_instance = Patient.objects.get(
            pk=user.id)  # Retrieve patient instance
        serializer = PatientSerializer(patient_instance)
    elif user.role == 'doctor' or user.role == 'system_admin' or user.role == 'researcher':
        serializer = DoctorSysAdminSerializer(user)
    else:
        return JsonResponse({'error': 'User role is not recognized'}, status=404)

    return JsonResponse(serializer.data, safe=False, json_dumps_params={'indent': 2}, status=200)


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

    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    doctors = Doctor.objects.all()
    doctor_serializer = DoctorSysAdminSerializer(doctors, many=True)

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

    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    users_data = {'patients': patient_serializer.data}
    return JsonResponse(users_data, json_dumps_params={'indent': 2}, status=200)


@api_view(['PUT'])
def updateDetails(request):  # for users to update own details

    user = request.user

    if user.role == 'doctor' or user.role == 'system_admin' or user.role == 'researcher':
        serializer = DoctorSysAdminUpdateSerializer(user, data=request.data)
    elif user.role == 'patient':
        serializer = PatientUpdateSerializer(user, data=request.data)
    else:
        return JsonResponse({"error": "Invalid user type"}, status=400)

    if serializer.is_valid():
        if 'password' in serializer.validated_data:
            serializer.validated_data['password'] = make_password(
                serializer.validated_data['password'])
        serializer.save()
        return JsonResponse(serializer.data, safe=False, status=200)
    else:
        return JsonResponse(serializer.errors, status=400)



@api_view(['PUT'])
# for system admin to update another person's details
def updateUserDetails(request):

    role = request.data.get('role')
    pk = request.data.get('id')
    if role == 'doctor':
        doctor = Doctor.objects.get(pk=pk)
        serializer = DoctorSysAdminUpdateSerializer(doctor, data=request.data)
    elif role == 'patient':
        patient = Patient.objects.get(pk=pk)
        serializer = PatientUpdateSerializer(patient, data=request.data)
    elif role == 'researcher':
        researcher = Researcher.objects.get(pk=pk)
        serializer = DoctorSysAdminUpdateSerializer(researcher, data=request.data)
    else:
        return JsonResponse({"error": "Invalid role"}, status=400)    
    
    if serializer.is_valid():
        if 'password' in serializer.validated_data:
            serializer.validated_data['password'] = make_password(
                serializer.validated_data['password'])
        serializer.save()
        return JsonResponse({'message': 'User updated successfully.'}, status=200)
    else:
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


@api_view(['POST'])
def createUser(request):    # for patient to register and for system admin to create a user
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
            user = Patient.objects.create(
                username=username, password=password, email=email, name=name, phone_number=phone_number, status=status)

        elif role == 'doctor':
            user = Doctor.objects.create(
                username=username, password=password, email=email, name=name, phone_number=phone_number)

        elif role == 'system_admin':
            user = SystemAdmin.objects.create(
                username=username, password=password, email=email, name=name, phone_number=phone_number)

        elif role == 'researcher':
            user = Researcher.objects.create(
                username=username, password=password, email=email, name=name, phone_number=phone_number)

        else:
            return JsonResponse({'error': 'Invalid role'}, status=400)

        return JsonResponse({'message': 'User created successfully.'}, status=201)
    else:
        return JsonResponse({'error': 'User not created.'}, status=400)


def testPatient(request, pk):
    patient = Patient.objects.get(pk=pk)
    serializer = PatientSerializer(patient)
    return JsonResponse(serializer.data, json_dumps_params={'indent': 2})

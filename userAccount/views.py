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
from django.urls import reverse
from userAccount.serializers import (DoctorSysAdminGetDetailsSerializer,
                                     DoctorSysAdminSerializer,
                                     DoctorSysAdminUpdateSerializer,
                                     PatientGetDetailsSerializer,
                                     PatientSerializer,
                                     PatientUpdateSerializer)

from .models import Doctor, Patient, SystemAdmin
from django.contrib.auth.hashers import make_password

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
                redirect_url = reverse('reportView') + f'?account_id={user.account_id}'
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




def logout(request):
    auth_logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')



#@api_view(['GET']) # yc need to look at again              #for users to view own details
#@permission_classes([IsAuthenticated]) 
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




def getUserDetails(request, pk):                                                    #for system admin to view specific user details
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
    #return JsonResponse(serializer.data, json_dumps_params={'indent': 2})


    
#@api_view(['GET'])
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

    users_data = {
        'patients': patient_serializer.data,
        'doctors': doctor_serializer.data,
        'system_admins': system_admin_serializer.data
    }
    return render(request, 'UserAcc.html', {'users_data': users_data})
    #return JsonResponse(users_data, json_dumps_params={'indent': 2})


@api_view(['GET'])
def listPatients(request):                                                               #for doctor to view list of patients !! have not updated url, waiting for UI
    # Serialize patients
    patients = Patient.objects.all()
    patient_serializer = PatientSerializer(patients, many=True)

    
    users_data = {'patients': patient_serializer.data}
    return render(request, 'UserAcc.html', {'users_data': users_data})


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
def updateUserDetails(request, pk):                                                             #for system admin to update another person details
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
            serializer = DoctorSysAdminUpdateSerializer(system_admin, data=request.POST)
        except SystemAdmin.DoesNotExist:
            return HttpResponseNotFound("User not found")

    if serializer.is_valid():
        serializer.save()
        return redirect(reverse('getUserDetails', kwargs={'pk': pk}))
    else:
        # Return errors if serializer is not valid
        return Response(serializer.errors, status=400)



def searchUser(request, pk):            #for doctor to search for patients and for system admin to search for both doctor and patient
    if pk:
        try:
            if request.user.role == 'doctor':
                searchUser = Patient.objects.get(pk=pk)
                serializer = PatientGetDetailsSerializer(searchUser)
            else:
                try:
                    searchUser = Patient.objects.get(pk=pk)
                    serializer = PatientGetDetailsSerializer(searchUser)
                except Patient.DoesNotExist:
                    searchUser = Doctor.objects.get(pk=pk)
                    serializer = DoctorSysAdminGetDetailsSerializer(searchUser)

            return JsonResponse(serializer.data, json_dumps_params={'indent': 2})
        except (Patient.DoesNotExist, Doctor.DoesNotExist):
            return JsonResponse({"error": "User not found"}, status=404)
    return JsonResponse({"error": "User not found"}, status=400)


def deleteUser(request, pk):                    #for system admin to delete a user
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
        return JsonResponse({'message': 'User deleted successfully.'})
    else:
        return JsonResponse({'error': 'User not found.'}, status=404)
    
    
def createUser(request):                        #for patient to register and for system admin to create a user
    if request.method == 'POST':
        name = request.POST.get('name')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = make_password(request.POST.get('password'))
        role = request.POST.get('role')

        # Create the user based on the role
        if role == 'patient':
            status = 'not_applicable'  # Set default status for patient
            user = Patient.objects.create_user(username=username, password=password, email=email, name=name, phone_number=phone_number, role=role, status=status)

        elif role == 'doctor':
            user = Doctor.objects.create_user(username=username, password=password, email=email, name=name, phone_number=phone_number, role=role)

        elif role == 'system_admin':
            user = SystemAdmin.objects.create_user(username=username, password=password, email=email, name=name, phone_number=phone_number, role=role)

        else:
            # Handle invalid role
            return JsonResponse({'error': 'Invalid role'}, status=400)

        return JsonResponse({'message': 'User created successfully.'})


    else:
        # Handle non-POST request
        return JsonResponse({'error': 'User not created.'}, status=405)
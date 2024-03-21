from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import (HttpResponse, HttpResponseBadRequest,
                         HttpResponseRedirect, JsonResponse)
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from userAccount.serializers import (DoctorSysAdminSerializer,
                                     DoctorSysAdminUpdateSerializer,
                                     PatientSerializer)

from .models import Doctor, Patient, SystemAdmin

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
            return HttpResponse('Logged in successfully, will link UI later')
        else:
            return HttpResponse('Invalid credentials')


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

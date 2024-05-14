from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import APIClient
from userAccount.models import Doctor, Patient, Researcher, SystemAdmin
from userAccount.views import getDetails, getUserDetails
from userAccount.serializers import PatientSerializer, DoctorSysAdminSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

class AccountModelTest(TestCase):

    def test_patient_creation(self):
        patient = Patient.objects.create(
            username='modelpatient',
            email='modelpatient@example.com',
            password='patient123',
            name='tommy',
            phone_number='1234567890',
            status='Normal',
            role='patient'
        )
        self.assertEqual(patient.status, 'Normal')
        self.assertEqual(patient.role, 'patient')

    def test_doctor_creation(self):
        doctor = Doctor.objects.create(
            username='modeldoctor',
            email='newdoc@example.com',
            password='patient123',
            name='joe',
            phone_number='1234567899',
            role= 'doctor'
        )
        self.assertEqual(doctor.role, 'doctor')
    
    def test_researcher_creation(self):
        researcher = Researcher.objects.create(
            username='researchermodel',
            email='researchmodel@example.com',
            password='research123',
            name='joe',
            phone_number='1234567899',
            role= 'researcher'
        )
        self.assertEqual(researcher.role, 'researcher')

    def test_system_admin_creation(self):
        admin = SystemAdmin.objects.create(
            username='sysadminmodel',
            email='sysadmin@example.com',
            password='admin123',
            name='robert',
            phone_number='1234567899',
            role= 'system_admin'
        )
        self.assertEqual(admin.is_staff, True)
        self.assertEqual(admin.role, 'system_admin')
#hi try again
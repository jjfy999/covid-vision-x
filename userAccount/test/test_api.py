# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import APIClient
from userAccount.models import Doctor, Patient, SystemAdmin
from userAccount.views import getDetails, getUserDetails
from userAccount.serializers import PatientSerializer, DoctorSysAdminSerializer
from django.contrib.auth import get_user_model

# Retrieve the custom user model
User = get_user_model()

class views_api_TestCase(TestCase):
    def setUp(self):
        # Create instances of Patient, Doctor, and SystemAdmin directly
        self.patient_user = Patient.objects.create(
            username='patient1',
            email='patient1@example.com',
            password='patient1',
            name='Patient User',
            phone_number='1234567890',
            status='Normal'
        )
        self.doctor_user = Doctor.objects.create(
            username='doctor',
            email='doctor@example.com',
            password='testpass',
            name='Doctor User',
            phone_number='0987654321'
        )
        self.admin_user = SystemAdmin.objects.create(
            username='admin',
            email='admin@example.com',
            password='testpass',
            name='Admin User',
            phone_number='1122334455'
        )

        self.client = APIClient()
    #------------------------------------------------------------------------
    # tested getDetails() - ALL PASSED
    """
    def test_patient_getDetails(self): 
        self.client.force_authenticate(user=self.patient_user)
        response = self.client.get(reverse('getDetails'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Ensure that the response data matches expected values
        self.assertIn('Patient User', response.json()['name'])

    def test_doctor_getDetails(self): 
        self.client.force_authenticate(user=self.doctor_user)
        response = self.client.get(reverse('getDetails'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Doctor User', response.json()['name'])
    
    def test_admin_getDetails(self): 
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse('getDetails'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Admin User', response.json()['name'])
    """
    
    # ---------------------------------------------------------------------------------
    # for getUserDetails() admin to view specific user (All PASSED)
    
    def test_get_doctor_details(self):
        # Reverse function constructs the URL from the view name and parameters
        url = reverse('getUserDetails', kwargs={'pk': self.doctor_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Doctor User', response.json()['name'])

    def test_get_patient_details(self):
        url = reverse('getUserDetails', kwargs={'pk': self.patient_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Patient User', response.json()['name'])

    def test_get_admin_details(self):
        url = reverse('getUserDetails', kwargs={'pk': self.admin_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Admin User', response.json()['name'])

    def test_user_not_found(self):
        # Test the case where no user is found for the given PK
        url = reverse('getUserDetails', kwargs={'pk': 9999})  # Assuming 9999 is an ID that does not exist
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    # ----------------------------------------------------------------------------



    


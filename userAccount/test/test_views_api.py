# Create your tests here.
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
            status='Normal',
            role='patient'
        )

        self.patient_user2 = Patient.objects.create(
            username='patient2',
            email='patient2@example.com',
            password='patient2',
            name='Patient User 2',
            phone_number='1234567891',
            status='Normal',
            role='patient'
        )
        
        self.doctor_user = Doctor.objects.create(
            username='doctor',
            email='doctor@example.com',
            password='testpass',
            name='Doctor User',
            phone_number='0987654321',
            role='doctor'
        )
        
        self.admin_user = SystemAdmin.objects.create(
            username='admin',
            email='admin@example.com',
            password='testpass',
            name='Admin User',
            phone_number='1122334455',
            role='system_admin'
        )

        self.researcher_user = Researcher.objects.create(
            username='Researcher',
            email='researcher@example.com',
            password='testpass',
            name='Researcher User',
            phone_number='1122334466',
            role='researcher'
        )

        self.client = APIClient()
        self.url = reverse('createUser') 
    #------------------------------------------------------------------------
    # test getDetails() for users to view own details - ALL PASSED
    
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
    
    def test_researcher_getDetails(self): 
        self.client.force_authenticate(user=self.researcher_user)
        response = self.client.get(reverse('getDetails'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Researcher User', response.json()['name'])
        
    # ---------------------------------------------------------------------------------
    # test getUserDetails() admin to view specific user (All PASSED)
    
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
    
    def test_get_researcher_details(self):
        # Reverse function constructs the URL from the view name and parameters
        url = reverse('getUserDetails', kwargs={'pk': self.researcher_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Researcher User', response.json()['name'])
    
    # ----------------------------------------------------------------------------
    # test listUsers():  # for system admin to view list of users (PASSED)
    
    def test_list_users(self):
        url = reverse('sysUserAccList')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Parse response data
        response_data = response.json()

        # Test that each category of users is correctly serialized and included
        self.assertEqual(len(response_data['patients']), 2)
        self.assertIn('Patient User', response_data['patients'][0]['name'])
        self.assertEqual(len(response_data['doctors']), 1)
        self.assertIn('Doctor User', response_data['doctors'][0]['name'])
        self.assertEqual(len(response_data['system_admins']), 1)
        self.assertIn('Admin User', response_data['system_admins'][0]['name'])
        self.assertEqual(len(response_data['researchers']), 1)
        self.assertIn('Researcher User', response_data['researchers'][0]['name'])
        
    #---------------------------------------------------------------------------------
    # test listPatients() for doctor to view list of patients (PASSED)
    
    def test_list_patients(self):
        url = reverse('docUserAccList')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Parse response data
        response_data = response.json()

        # Test that patients are correctly serialized and included
        self.assertEqual(len(response_data['patients']), 2)
        names = [patient['name'] for patient in response_data['patients']]
        self.assertIn('Patient User', names)
        self.assertIn('Patient User 2', names)
        
    #---------------------------------------------------------------------------------
    # test updateDetails() for users to update own details (PASSED)
    
    def test_update_patient_details(self):
        self.client.force_authenticate(user=self.patient_user)
        url = reverse('updateDetails')  # Adjust URL name based on your urls.py
        data = {'email': 'patientUpdated@example.com', 'phone_number': '12345'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['email'], 'patientUpdated@example.com')
        self.assertEqual(response.json()['phone_number'], '12345')

    def test_update_doctor_details(self):
        self.client.force_authenticate(user=self.doctor_user)
        url = reverse('updateDetails')
        data = {'email': 'doctorUpdated@example.com'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['email'], 'doctorUpdated@example.com')

    def test_update_admin_details(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('updateDetails')
        data = {'email': 'adminUpdated@example.com'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['email'], 'adminUpdated@example.com')

    def test_update_researcher_details(self):
        self.client.force_authenticate(user=self.researcher_user)
        url = reverse('updateDetails')
        data = {'email': 'researcherUpdated@example.com'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['email'], 'researcherUpdated@example.com')
    
    #-------------------------------------------------------------------------------------
    # updateUserDetails() for system admin to update another person's details (PASSED)
    
    def test_update_patient_details(self):
        url = reverse('updateUserDetails', kwargs={'pk': self.patient_user.pk})
        data = {'email': 'patientUpdatedbyADMIN@example.com', 'phone_number': '12345'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('User updated successfully.', response.json()['message'])

    def test_update_doctor_details(self):
        url = reverse('updateUserDetails', kwargs={'pk': self.doctor_user.pk})
        data = {'email': 'doctorUpdatedAdmin@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('User updated successfully.', response.json()['message'])

    def test_update_researcher_details(self):
        url = reverse('updateUserDetails', kwargs={'pk': self.researcher_user.pk})
        data = {'email': 'researcherUpdatedAdmin@example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('User updated successfully.', response.json()['message'])

    def test_user_not_found(self):
        url = reverse('updateUserDetails', kwargs={'pk': 9999})  # Assuming 9999 is an ID that does not exist
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    #---------------------------------------------------------------------------------------
    # # for doctor to search for a patient, and for system admin to search for everyone
    # searchUser() (PASSED)
    
    def test_search_patient_by_doctor(self):
        self.client.force_authenticate(user=self.doctor_user)
        # Test searching the first patient
        url = reverse('searchUser', kwargs={'pk': self.patient_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'Patient User')
        
        # Test searching the second patient
        url = reverse('searchUser', kwargs={'pk': self.patient_user2.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'Patient User 2')



    def test_search_all_by_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        # Test searching a doctor
        url = reverse('searchUser', kwargs={'pk': self.doctor_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'Doctor User')
        # Test searching a researcher
        url = reverse('searchUser', kwargs={'pk': self.researcher_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'Researcher User')
        # Test searching a patient
        url = reverse('searchUser', kwargs={'pk': self.patient_user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['name'], 'Patient User')
    
    #-----------------------------------------------------------------------------
    # deleteUser() for system admin to delete a user (PASSED)
    
    def test_delete_doctor(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('deleteUser', kwargs={'pk': self.doctor_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'User deleted successfully.')
        self.assertFalse(Doctor.objects.filter(pk=self.doctor_user.pk).exists())

    def test_delete_patient(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('deleteUser', kwargs={'pk': self.patient_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Patient.objects.filter(pk=self.patient_user.pk).exists())

    def test_delete_researcher(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('deleteUser', kwargs={'pk': self.researcher_user.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Researcher.objects.filter(pk=self.researcher_user.pk).exists())

    def test_user_not_found(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('deleteUser', kwargs={'pk': 9999})  # Assuming 9999 is an ID that does not exist
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.json()['error'], 'User not found.')
    
    #--------------------------------------------------------------------------------------
    # createUser() for patient to register and for system admin to create a user (PASSED)
    
    def test_create_patient(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'username':'newpatient',
            'email':'newpatient@example.com',
            'password':'patient123',
            'name':'New Patient',
            'phone_number':'1234567890',
            'status':'Normal',
            'role':'patient'
        }
        
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Patient.objects.count(), 3)
        self.assertTrue(check_password('patient123', Patient.objects.get(username='newpatient').password))

    def test_create_doctor(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'New Doctor',
            'phone_number': '0987654321',
            'email': 'newdoctor@example.com',
            'username': 'newdoctor',
            'password': 'doctor123',
            'role': 'doctor'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Doctor.objects.count(), 2)
        self.assertTrue(check_password('doctor123', Doctor.objects.get(username='newdoctor').password))
    
    def test_create_researcher(self):
        self.client.force_authenticate(user=self.admin_user)
        data = {
            'name': 'New researcher',
            'phone_number': '0987654322',
            'email': 'newresearcher@example.com',
            'username': 'newresearcher',
            'password': 'researcher123',
            'role': 'researcher'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Researcher.objects.count(), 2)
        self.assertTrue(check_password('researcher123', Researcher.objects.get(username='newresearcher').password))

    def test_invalid_role(self):
        data = {
            'name': 'Invalid User',
            'phone_number': '0123456789',
            'email': 'invaliduser@example.com',
            'username': 'invaliduser',
            'password': 'invalid123',
            'role': 'unknown'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid role', response.json()['error'])
    
    #---------------------------------------------------------------------------------
    









    


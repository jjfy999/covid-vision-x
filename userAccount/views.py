from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from userAccount.serializers import DoctorSysAdminSerializer, PatientSerializer
from .models import Patient, Doctor, SystemAdmin
from rest_framework.decorators import api_view
# Create your views here.


def loginPage(request):
    
    return render(request, 'login.html')

'''
@login_required
def updateDetails(request):
    if request.method == 'POST':
        user = request.user
        new_username = request.POST.get('newUsername')
        new_email = request.POST.get('newEmail')
        new_phone_number = request.POST.get('newPhoneNumber')
        new_name = request.POST.get('newName')
        
        # Check if the user is a Doctor or a SystemAdmin
        if isinstance(user, Doctor) or isinstance(user, SystemAdmin):
            serializer = DoctorSysAdminUpdateSerializer(user, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                messages.success(request, "Details updated successfully!")
            else:
                messages.error(request, "Failed to update details")
        else:
            messages.error(request, "Invalid user type")
'''

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
    system_admin_serializer = DoctorSysAdminSerializer(system_admins, many=True)

    # Combine the serialized data
    users_data = {
        'patients': patient_serializer.data,
        'doctors': doctor_serializer.data,
        'system_admins': system_admin_serializer.data
    }

    return JsonResponse(users_data, json_dumps_params={'indent': 2})




def loginAuth(request): #only a temporary login function for testing
    
    if request.method == 'POST':
        username = request.POST['uname']
        password = request.POST['psw']

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponse('Logged in successfully, will link UI later')
        else:
            return HttpResponse('Invalid credentials')



@login_required
def updateDetails(request):
    if request.method == 'POST':
        user = request.user
        new_username = request.POST.get('newUsername')
        new_email = request.POST.get('newEmail')
        new_phone_number = request.POST.get('newPhoneNumber')
        new_name = request.POST.get('newName')
        
        if user.update_Details(new_username, new_email, new_phone_number, new_name):
            messages.success(request, "Details updated successfully!")
        else:
            messages.error(request, "Failed to update details")
            
        return redirect('accdetails')  # Redirect to the user details page
    else:
        return render(request, 'update_details.html')  # Render the update details form

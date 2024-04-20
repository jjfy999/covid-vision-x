from django.shortcuts import render
import numpy as np
from django.http import JsonResponse
import os 
import tensorflow as tf
from keras.models import load_model
from userAccount.models import Patient
from datetime import date
from .models import Report
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
from deepLearningModel.serializers import ReportSerializer, ReportApprovalSerializer
from django.conf import settings
# Create your views here.
# views.py


def analyze_image(request):                                 #not serializing the report data
    if request.method == 'POST':
        # Load the model
        model_path = os.path.join(os.path.dirname(__file__), 'Model/fyptest1.hdf5')
        model = load_model(model_path)

        # Get the image from the request
        image_file = request.FILES['image']
        image_data = image_file.read()
        image_tensor = tf.image.decode_image(image_data, channels=3)

        # Perform any preprocessing on the image
        # For example, resize the image to match the input size of your model
        resized_image = tf.image.resize(image_tensor, (256, 256))
        normalized_image = resized_image / 255.0
        processed_image = tf.expand_dims(normalized_image, axis=0)

        # Make predictions using the model
        predictions = model.predict(processed_image)

        # Determine status based on predictions
        status = "Covid-19" if predictions < 0.5 else "Normal"

        # Get the patient ID from the request
        patient_id = request.POST.get('account_id')

        # Retrieve the patient instance using the provided ID
        try:
            patient = Patient.objects.get(account_id=patient_id)
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Patient not found."}, status=400)

        print (patient.name)
        print(patient.account_id)
        print(status)
        print(patient.email)
        print(patient.phone_number)
        print(date.today())
        # Create the report
        report = Report.objects.create(
            status=status,
            patient_name=patient.name,
            date=date.today(),
            patient_id=patient,  # Use the account_id of the patient
            approved=False,
            image=image_file
        )

        # Return the result to the user
        result = {"status": status, "patientName": patient.name, "date": str(date.today())}
        return JsonResponse(result, json_dumps_params={'indent': 2}, safe=False)

    return JsonResponse({}, status=400)


'''
def analyze_image(request):
    if request.method == 'POST':
        # Load the model
        model_path = os.path.join(os.path.dirname(__file__), 'Model/fyptest1.hdf5')
        model = load_model(model_path)

        # Get the image from the request
        image_file = request.FILES['image']
        image_data = image_file.read()
        image_tensor = tf.image.decode_image(image_data, channels=3)

        # Perform any preprocessing on the image
        # For example, resize the image to match the input size of your model
        resized_image = tf.image.resize(image_tensor, (256, 256))
        normalized_image = resized_image / 255.0
        processed_image = tf.expand_dims(normalized_image, axis=0)

        # Make predictions using the model
        predictions = model.predict(processed_image)

        # Determine status based on predictions
        status = "covid" if predictions < 0.5 else "normal"

        # Get the patient ID from the request
        patient_id = request.POST.get('account_id')

        # Retrieve the patient instance using the provided ID
        try:
            patient = Patient.objects.get(account_id=patient_id)
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Patient not found."}, status=400)

        image_url = f"{settings.MEDIA_URL}report_images/{image_file}"
        print(image_url)
        # Create the report data
        report_data = {
            'status': status,
            'patient_name': patient.name,
            'date': date.today(),
            'patient_id': patient,  # Use the account_id of the patient
            'approved': False,
            'image': image_url
        }

        # Serialize and save the report data
        report_serializer = ReportSerializer(data=report_data)
        if report_serializer.is_valid():
            report_serializer.save()
        else:
            print(report_serializer.errors)
            return JsonResponse({"error": "Failed to save report data."}, status=400)

        # Return the result to the user
        result = {"status": status, "patientName": patient.name, "date": str(date.today())}
        return JsonResponse(result, json_dumps_params={'indent': 2}, safe=False)

    return JsonResponse({}, status=400)
'''

def listNonUploadedReports(request):        #for doctor to view all non uploaded reports
    reports = Report.objects.filter(approved=False)
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    #return JsonResponse(data, json_dumps_params={'indent': 2})
    return render(request, 'nonUpdatedReport.html', {'reports': reports})


def listUploadedReports(request):       #for doctor to view all uploaded reports
    reports = Report.objects.filter(approved=True)
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2})


def listAllReports(request):           #for testing to view all reports
    reports = Report.objects.all()
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2})
    

    

def uploadReport(request):                                      #for doctor to upload report                      
    report_id = request.POST.get('report_id')
    try:
        report = Report.objects.get(pk=report_id)
        serializer = ReportApprovalSerializer(instance=report, data={'approved': True}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Report updated successfully.'})
        else:
            return JsonResponse(serializer.errors, status=400)
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)



def deleteReport(request):                                  #for doctor to delete non uploaded report
    report_id = request.POST.get('report_id')
    try:
        report = Report.objects.get(pk=report_id)
        report.delete()
        return JsonResponse({'message': 'Report deleted successfully.'})
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)
    

def reportView(request):                                     #for patient to view their reports      
    account_id = request.GET.get('account_id')
    print("Received account_id:", account_id) 
    try:
        patient = Patient.objects.get(pk=account_id)
    except Patient.DoesNotExist:
        return JsonResponse({"error": "Patient not found."}, status=400)
    
    reports = Report.objects.filter(patient_id=patient, approved=True)
    serializer = ReportSerializer(reports, many=True)  
    return JsonResponse({"Reports": serializer.data}, json_dumps_params={'indent': 2}, safe=False)

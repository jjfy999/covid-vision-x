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
import boto3
from covidVisionX.settings import AWS_STORAGE_BUCKET_NAME,AWS_S3_REGION_NAME #,AWS_STORAGE_BUCKET_NAME_MODELS
import io
from rest_framework.decorators import api_view
# Create your views here.
# views.py
'''
loaded_model_newtest = None
model_loaded_newtest = False

loaded_model_fyptest = None
model_loaded_fyptest = False

def load_model_from_s3_newtest():
    global loaded_model_newtest, model_loaded_newtest
    if not model_loaded_newtest:
        # Initialize S3 client
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                          region_name=settings.AWS_S3_REGION_NAME)

        # Specify the S3 bucket and file name of the model
        bucket_name = 'fypmodelss'
        model_key = 'newtest.h5'

        # Load the model from S3
        try:
            obj = s3.get_object(Bucket=bucket_name, Key=model_key)
            model_data = obj['Body'].read()
            loaded_model_newtest = tf.keras.models.load_model(io.BytesIO(model_data))
            model_loaded_newtest = True
        except Exception as e:
            raise RuntimeError(f"Failed to load model from S3: {e}")
        
        
def load_model_from_s3_fyptest():
    global loaded_model_fyptest, model_loaded_fyptest
    if not model_loaded_fyptest:
        # Initialize S3 client
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                          region_name=settings.AWS_S3_REGION_NAME)

        # Specify the S3 bucket and file name of the model
        bucket_name = 'fypmodelss'
        model_key = 'fyptest1.hdf5'

        # Load the model from S3
        try:
            obj = s3.get_object(Bucket=bucket_name, Key=model_key)
            model_data = obj['Body'].read()
            loaded_model_fyptest = tf.keras.models.load_model(io.BytesIO(model_data))
            model_loaded_fyptest = True
        except Exception as e:
            raise RuntimeError(f"Failed to load model from S3: {e}")
'''



def analyze_image(request):                                 #not serializing the report data
    if request.method == 'POST':
        # Load the model
        model_path = os.path.join(os.path.dirname(__file__), 'Model/fyptest1.hdf5')
        model = load_model(model_path)

        #load_model_from_s3_newtest()
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
            patient = Patient.objects.get(pk=patient_id)
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Patient not found."}, status=400)
        
        image_buffer = io.BytesIO()
        image_buffer.write(image_data)
        image_buffer.seek(0)


        print (patient.name)
        print(patient.id)
        print(status)
        print(patient.email)
        print(patient.phone_number)
        print(date.today())
        print(image_file)
        # Create the report
        report = Report.objects.create(
            status=status,
            patient_name=patient.name,
            date=date.today(),
            patient_id=patient,  
            approved=False,
            image=image_file
        )
        print(image_file)
        print(report.image.name)
        print(report.image.url)

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


@api_view(['GET'])
def listNonUploadedReports(request):        #for doctor to view all non uploaded reports            
    reports = Report.objects.filter(approved=False)
    for report in reports:
        print(report.image.name)
        print(report.image)
        report.image = report.image.url
        print(report.image)
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    #return JsonResponse(data, json_dumps_params={'indent': 2})
    return render(request, 'nonUpdatedReport.html', {'reports': reports})

@api_view(['GET'])
def listUploadedReports(request):       #for doctor to view all uploaded reports
    reports = Report.objects.filter(approved=True)
    for report in reports:
        report.image = report.image.url

    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2})


@api_view(['GET'])
def listAllReports(request):           #for testing to view all reports
    reports = Report.objects.all()
    for report in reports:
        report.image = report.image.url
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2})
    

@api_view(['POST'])
def uploadReport(request):                     #for doctor to upload report             #haven code for dropdown overwrite status!!
    report_id = request.POST.get('report_id')
    try:
        report = Report.objects.get(pk=report_id)
        serializer = ReportApprovalSerializer(instance=report, data={'approved': True}, partial=True)
        if serializer.is_valid():
            # Update the report approval status
            serializer.save()

            # Retrieve the patient associated with the report
            patient = Patient.objects.get(pk=report.patient_id)

            # Update the patient's status based on the report's status
            patient.status = report.status
            patient.save()

            return JsonResponse({'message': 'Report updated successfully.'})
        else:
            return JsonResponse(serializer.errors, status=400)
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)



@api_view(['DELETE'])
def deleteReport(request):                                  #for doctor to delete non uploaded report
    report_id = request.POST.get('report_id')
    try:
        report = Report.objects.get(pk=report_id)
        report.delete()
        return JsonResponse({'message': 'Report deleted successfully.'})
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)
    

@api_view(['GET'])
def reportView(request):                                     #for patient to view their reports      
    account_id = request.GET.get('account_id')
    print("Received account_id:", account_id) 
    try:
        patient = Patient.objects.get(pk=account_id)
    except Patient.DoesNotExist:
        return JsonResponse({"error": "Patient not found."}, status=400)
    
    reports = Report.objects.filter(patient_id=patient, approved=True)
    for report in reports:
        report.image = report.image.url
    serializer = ReportSerializer(reports, many=True)  
    return JsonResponse({"Reports": serializer.data}, json_dumps_params={'indent': 2}, safe=False)

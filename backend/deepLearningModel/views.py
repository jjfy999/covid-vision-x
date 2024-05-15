import io
import os
import tempfile
from datetime import date

import boto3
import cv2
import h5py
import numpy as np
import tensorflow as tf
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage, get_storage_class
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_POST
from keras.models import load_model
from rest_framework.decorators import api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from storages.backends.s3boto3 import S3Boto3Storage

from covidVisionX.settings import (  # ,AWS_STORAGE_BUCKET_NAME_MODELS
    AWS_S3_REGION_NAME, AWS_STORAGE_BUCKET_NAME)
from deepLearningModel.serializers import (ReportApprovalSerializer,
                                           ReportSerializer)
from userAccount.models import Patient

from .models import Report


@api_view(['GET'])
# for doctor to view all non uploaded reports
def listNonUploadedReports(request):
    reports = Report.objects.filter(approved=False)
    for report in reports:
        report.image = report.image.url
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2}, status=200)


@api_view(['GET'])
def listUploadedReports(request):  # for doctor to view all uploaded reports
    reports = Report.objects.filter(approved=True)
    for report in reports:
        report.image = report.image.url

    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2}, status=200)


@api_view(['GET'])
def listAllReports(request):  # for testing to view all reports
    reports = Report.objects.all()
    for report in reports:
        if report.image:
            # Construct S3 URL
            report.image = f"http://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{report.image}"
    serializer = ReportSerializer(reports, many=True)
    data = {"reports": serializer.data}
    return JsonResponse(data, json_dumps_params={'indent': 2}, status=200)


@api_view(['PUT'])
# for doctor to upload report             #haven code for dropdown overwrite status!!
def uploadReport(request):
    report_id = request.data.get('report_id')
    status = request.data.get('status')
    try:
        report = Report.objects.get(pk=report_id)
        serializer = ReportApprovalSerializer(
            instance=report, data={'approved': True, 'status': status}, partial=True)
        if serializer.is_valid():

            serializer.save()

            patient = Patient.objects.get(pk=report.patient_id)

            patient.status = status
            patient.save()

            return JsonResponse({'message': 'Report updated successfully.'}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)


@api_view(['DELETE'])
def deleteReport(request, pk):  # for doctor to delete non uploaded report
    try:
        report = Report.objects.get(pk=pk)
        report.delete()
        return JsonResponse({'message': 'Report deleted successfully.'}, status=200)
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=400)


@api_view(['GET'])
def reportView(request):  # for patient to view their reports
    user = request.user
    try:
        patient = Patient.objects.get(pk=user.id)
    except Patient.DoesNotExist:
        return JsonResponse({"error": "Patient not found."}, status=400)

    reports = Report.objects.filter(patient_id=patient, approved=True)

    serializer = ReportSerializer(reports, many=True)
    return JsonResponse(serializer.data, json_dumps_params={'indent': 2}, safe=False, status=200)


def analyze_image2(request):
    if request.method == 'POST':
        # Load the model
        model_path = os.path.join(os.path.dirname(
            __file__), 'Model/fyptest1.hdf5')
        model = load_model(model_path)

        # Get the image from the request
        image_file = request.FILES['image']

        # Perform any preprocessing on the image
        # For example, resize the image to match the input size of your model
        image_data = image_file.read()
        image_tensor = tf.image.decode_image(image_data, channels=3)
        resized_image = tf.image.resize(image_tensor, (256, 256))
        normalized_image = resized_image / 255.0
        processed_image = tf.expand_dims(normalized_image, axis=0)

        # Make predictions using the model
        predictions = model.predict(processed_image)

        # Determine status based on predictions
        status = "Covid" if predictions < 0.5 else "Normal"

        # Get the patient ID from the request
        patient_id = request.POST.get('id')

        # Retrieve the patient instance using the provided ID
        try:
            patient = Patient.objects.get(pk=patient_id)
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Patient not found."}, status=400)

        # Save the image to the 'fypimagess' bucket
        storage = get_storage_class(
            'storages.backends.s3boto3.S3Boto3Storage')(bucket='fypimagess')
        image_name = storage.save(image_file)

        # Create the report
        report = Report.objects.create(
            status=status,
            patient_name=patient.name,
            date=date.today(),
            patient_id=patient,
            approved=False,
            image=image_name  # Save the image path instead of the file itself
        )

        # Return the result to the user
        result = {"status": status, "patientName": patient.name,
                  "date": str(date.today())}
        return JsonResponse(result, json_dumps_params={'indent': 2}, safe=False, status=200)

    return JsonResponse({}, status=400)


@api_view(['POST'])
def uploadModel(request):
    if request.method == 'POST':
        # Get the model file from the request
        model_file = request.FILES['model']
        model_name = request.POST.get('model_name')

        # Save the model to the 'fypmodelss' bucket
        bucket_name = 'fypmodelss'

        s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                 aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_S3_REGION_NAME)

        s3_client.put_object(Body=model_file, Bucket=bucket_name, Key=model_name)

        return JsonResponse({"success": True, "message": "Model uploaded successfully."})

    return JsonResponse({}, status=400)


@api_view(['DELETE'])
def deleteModel(request, name):
    if request.method == 'DELETE':

        bucket_name = 'fypmodelss'

        s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                 aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_S3_REGION_NAME)

        key = name

        try:
            s3_client.delete_object(Bucket=bucket_name, Key=key)
            return JsonResponse({"success": True, "message": "Model deleted successfully."})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({}, status=400)


models = {}


def download_and_load_model(model_path):

    if model_path not in models:
        s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                 aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_S3_REGION_NAME)

        try:
            response = s3_client.get_object(
                Bucket='fypmodelss', Key=model_path)

            model_data = response['Body'].read()
        except Exception as e:
            return JsonResponse({"error": "Failed to download the model."})

    # Write byte data to temporary HDF5 file
        with tempfile.NamedTemporaryFile(suffix=".h5" or ".hdf5") as temp_file:
            temp_file.write(model_data)
            models[model_path] = tf.keras.models.load_model(temp_file.name)

    print(models[model_path])
    return models[model_path]


@api_view(['POST'])
def predict(request):  # yongchuen model

    model_path = request.POST.get('model_path')
    model = download_and_load_model(model_path)
    if model:
        if request.method == 'POST':

            image_file = request.FILES['file']
            image_data = image_file.read()

            image_np = np.frombuffer(image_data, np.uint8)
            image = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

            # Resize the image to match the input size of your model
            image = cv2.resize(image, (256, 256))

            # Normalize the image
            image_array = image / 255.0

            # Expand dimensions to match the model input shape
            processed_image = np.expand_dims(image_array, axis=0)

            # image_tensor = tf.image.decode_image(image_data, channels=3)
            # resized_image = tf.image.resize(image_tensor, (256, 256))
            # normalized_image = resized_image / 255.0
            # processed_image = tf.expand_dims(normalized_image, axis=0)

            bucket_name = 'fypimagess'

            # Create an S3 client using settings
            s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                     aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                                     region_name=settings.AWS_S3_REGION_NAME)

            # Upload image to S3 bucket
            s3_client.put_object(
                Body=image_data, Bucket=bucket_name, Key=image_file.name)

            # Make predictions using the model
            prediction = model.predict(processed_image)

            # Return the index of the highest probability class
            prediction_index = np.argmax(prediction, axis=1)

            class_labels = ['COVID', 'Normal', 'Pneumonia']
            predicted_class = class_labels[prediction_index[0]]

            # Get the patient ID from the request
            patient_id = request.POST.get('Id')

            try:
                patient = Patient.objects.get(pk=patient_id)
            except Patient.DoesNotExist:
                return JsonResponse({"error": "Patient not found."}, status=400)

            report = Report.objects.create(
                status=predicted_class,
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,
                approved=False,
                image=image_file.name  # Save the image path instead of the file itself
            )

            return JsonResponse({}, json_dumps_params={'indent': 2}, safe=False, status=200)
        else:
            return JsonResponse({}, status=400)
    else:
        return JsonResponse({"error": "Failed to download the model.", "status": 400})


def listModels(request):

    bucket_name = 'fypmodelss'

    s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                             aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, region_name=settings.AWS_S3_REGION_NAME)

    response = s3_client.list_objects_v2(Bucket=bucket_name)

    keys = [obj['Key'] for obj in response.get('Contents', [])]

    data = {
        'keys': keys
    }

    return JsonResponse(data, safe=False, status=200)


@api_view(['GET'])
def showReport(request, pk):
    try:
        report = Report.objects.get(pk=pk)
    except Report.DoesNotExist:
        return JsonResponse({'error': 'Report not found.'}, status=404)

    serializer = ReportSerializer(report)

    data = serializer.data

    return JsonResponse(data, json_dumps_params={'indent': 2}, safe=False, status=200)

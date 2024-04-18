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
# Create your views here.
# views.py


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



def listReports(request):
    reports = Report.objects.filter(approved=False)
    #return JsonResponse({"reports": list(reports.values())}, json_dumps_params={'indent': 2}, safe=False)
    return render(request, 'nonUpdatedReport.html', {'reports': reports})
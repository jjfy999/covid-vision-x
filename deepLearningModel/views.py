from django.shortcuts import render
import numpy as np
from django.http import JsonResponse
import os 
import tensorflow as tf
from keras.models import load_model
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
        # Assume image_data is the preprocessed image data in numpy array format
        predictions = model.predict(processed_image)


        # Process the predictions and generate the result
        # For example, convert the predictions to a human-readable format


        if predictions < 0.5: 
            result = "Predicted class is Covid-19"
        else:
            result = "Predicted class is Normal"

        # Return the result to the user
        #return render(request, 'result.html', {'result': result})
        return JsonResponse(result, json_dumps_params={'indent': 2}, safe=False)

    # If the request method is not POST, render the form
    #return render(request, 'analyze_image.html')

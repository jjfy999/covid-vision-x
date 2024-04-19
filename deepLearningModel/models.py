from django.db import models
from userAccount.models import Patient
import tensorflow as tf
from tensorflow import keras
from keras.preprocessing import image
from keras.models import load_model
import os

class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    image_path = models.CharField(max_length=255)

    def __str__(self):
        return f"Image {self.image_id}"

class Report(models.Model):
    STATUS_CHOICES = [
        ('covid', 'COVID'),
        ('normal', 'Normal'),
    ]
    id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    patient_id = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='reports_by_id')
    patient_name = models.CharField(max_length=100)  # Add related_name for patient_name
    date = models.DateField()
    approved = models.BooleanField(default=False)
    image = models.ImageField(upload_to='report_images/')  # Change to ImageField to store image

    def __str__(self):
        return f"Report {self.id} for {self.patient_name}"


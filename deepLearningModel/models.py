from django.db import models
from userAccount.models import Patient
import tensorflow as tf
from tensorflow import keras
from keras.preprocessing import image
from keras.models import load_model
import os

class Image(models.Model):
    image_id = models.AutoField(primary_key=True)
    image_path = models.CharField(max_length=255)  # or use FileField to store the path

    def __str__(self):
        return f"Image {self.image_id}"


class Report(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]
    id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    image = models.OneToOneField(Image, on_delete=models.CASCADE)

    def __str__(self):
        return f"Report {self.id} for {self.patient.name}"



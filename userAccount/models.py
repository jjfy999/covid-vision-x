
import random

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, Permission
from django.db import models
from faker import Faker

fake = Faker()


class Account(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50, null=True)  # Define role field here

    def __str__(self):
        return self.username


class Patient(Account):
    STATUS_CHOICES = [
        ('Covid', 'Covid'),
        ('Normal', 'Normal'),
        ('Pneumonia', 'Pneumonia'),
        ('Not_Applicable', 'Not_Applicable'),
    ]
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Not_Applicable')

    def save(self, *args, **kwargs):
        self.role = 'patient'
        super().save(*args, **kwargs)


class Doctor(Account):

    def save(self, *args, **kwargs):
        self.role = 'doctor'
        super().save(*args, **kwargs)


class SystemAdmin(Account):

    def save(self, *args, **kwargs):
        self.role = 'system_admin'
        self.is_staff = True
        super().save(*args, **kwargs)

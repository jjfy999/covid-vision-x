from django.contrib.auth.models import AbstractUser
from django.db import models


class Account(AbstractUser):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    account_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.username

class Patient(Account):
    STATUS_CHOICES = [
        ('covid', 'COVID'),
        ('normal', 'Normal'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_applicable')
    role = 'patient'

class Doctor(Account):
    role = 'doctor'

class SystemAdmin(Account):
    role = 'system_admin'


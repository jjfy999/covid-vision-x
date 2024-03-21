
from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    account_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=20, null=True)  # Define role field here

    def __str__(self):
        return self.username
    
 


class Patient(Account):
    STATUS_CHOICES = [
        ('covid', 'COVID'),
        ('normal', 'Normal'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_applicable')
    
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
        super().save(*args, **kwargs)


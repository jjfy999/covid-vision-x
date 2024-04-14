
from django.contrib.auth.models import AbstractUser, Permission
from django.db import models
from faker import Faker
from django.contrib.auth.hashers import make_password
import random

fake = Faker()

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
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='not_applicable')

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



username = 'admin1'
admin, created = SystemAdmin.objects.get_or_create(
    username=username, email='admin1@gmail.com', phone_number='33333333', name='admin1')
admin.password = make_password(username)
admin.save()

username = 'patient1'
patient, created = Patient.objects.get_or_create(
    username=username, email='patient1@gmail.com', phone_number='44444444', name='patient1', status='covid')
patient.password = make_password(username)
patient.save()

username = 'doctor1'
doctor, created = Doctor.objects.get_or_create(
    username=username, email='doctor1@gmail.com', phone_number='55555555', name='doctor1')
doctor.password = make_password(username)
doctor.save()

        
# Generate new users
for i in range(10, 20):
    role = random.choice(['patient', 'doctor'])
    username = f'{role}{i+1}'
    email = f'{username}@gmail.com'
    phone_number = fake.phone_number()
    name = fake.name()

    if role == 'patient':
        status = random.choice(['covid', 'normal'])

        patient = Patient.objects.create(
            username=username,
            email=email,
            phone_number=phone_number,
            name=name,
            status=status
        )
        patient.password = make_password(username)
        patient.save()

    else:
        doctor = Doctor.objects.create(
            username=username,
            email=email,
            phone_number=phone_number,
            name=name
        )
        doctor.password = make_password(username)
        doctor.save()   

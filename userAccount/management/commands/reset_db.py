from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
from userAccount.models import Account, Doctor, Patient, SystemAdmin
from faker import Faker
import random
from django.db import connection
from django.core.management import call_command

fake = Faker()

class Command(BaseCommand):
    help = 'Reset the database by dropping all tables and recreating them'

    with connection.cursor() as cursor:
            cursor.execute("DELETE FROM sqlite_sequence WHERE name='userAccount_Account'")

    def handle(self, *args, **options):
        # Delete all rows from the custom user table
        Account.objects.all().delete()
        Doctor.objects.all().delete()
        Patient.objects.all().delete()

        username = 'admin1'
        admin, created = SystemAdmin.objects.get_or_create(username=username, email='admin1@gmail.com', phone_number='33333333', name='admin1')
        admin.password = make_password(username)
        admin.save()

        username = 'patient1'
        patient, created = Patient.objects.get_or_create(username=username, email='patient1@gmail.com', phone_number='44444444', name='patient1', status='covid')
        patient.password = make_password(username)
        patient.save()


        username = 'doctor1'
        doctor, created = Doctor.objects.get_or_create(username=username, email='doctor1@gmail.com', phone_number='55555555', name='doctor1')
        doctor.password = make_password(username)
        doctor.save()

        '''
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
        '''


        call_command('migrate')

        self.stdout.write(self.style.SUCCESS('Database reset completed successfully!'))

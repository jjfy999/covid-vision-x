import random

from django.contrib.auth.hashers import make_password
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection
from faker import Faker
from random import choice

from userAccount.models import Account, Doctor, Patient, SystemAdmin

fake = Faker()






from django.db.utils import IntegrityError



class Command(BaseCommand):
    help = 'Reset the database by dropping all tables and recreating them'

    def delete_all_rows(self):
        Account.objects.all().delete()
        Doctor.objects.all().delete()
        Patient.objects.all().delete()
        SystemAdmin.objects.all().delete()

    def handle(self, *args, **options):
        # Delete all rows from the tables
        self.delete_all_rows()

        # Recreate the initial records
        try:
            admin = SystemAdmin.objects.create(
                username='admin1',
                email='admin1@gmail.com',
                phone_number='99999999',
                name='admin1'
            )
            admin.password = make_password('admin1')
            admin.save()

            patient = Patient.objects.create(
                username='patient1',
                email='patient1@gmail.com',
                phone_number='99998888',
                name='patient1',
                status='covid'
            )
            patient.password = make_password('patient1')
            patient.save()

            doctor = Doctor.objects.create(
                username='doctor1',
                email='doctor1@gmail.com',
                phone_number='88888888',
                name='doctor1'
            )
            doctor.password = make_password('doctor1')
            doctor.save()


            # Generate new users
            for i in range(10, 20):
                role = random.choice(['patient', 'doctor'])
                username = f'{role}{i+1}'
                email = f'{username}@gmail.com'
                phone_number = f'{choice([8, 9])}{fake.random_number(digits=7)}'
                name = fake.name()

                if role == 'patient':
                    status = "Not_Applicable"

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



        except IntegrityError:
            # IntegrityError will be raised if the records already exist
            pass

        # Call migrate command to apply migrations
        call_command('migrate')

        self.stdout.write(self.style.SUCCESS(
            'Database reset completed successfully!'))

        
        
        


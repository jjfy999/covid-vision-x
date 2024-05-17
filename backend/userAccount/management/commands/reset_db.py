import random

from django.contrib.auth.hashers import make_password
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection
from faker import Faker
from random import choice

from userAccount.models import Account, Doctor, Patient, SystemAdmin, Researcher

fake = Faker()






from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = 'Reset the database by dropping all tables and recreating them'

    def drop_all_tables(self):
        with connection.cursor() as cursor:
            cursor.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")

    def handle(self, *args, **options):
        # Drop all tables
        self.drop_all_tables()

        # Call migrate command to apply migrations
        call_command('migrate')

        self.stdout.write(self.style.SUCCESS(
            'Database reset1 completed successfully!'))


'''
class Command(BaseCommand):
    help = 'Reset the database by dropping all tables and recreating them'

    def delete_all_rows(self):
        Account.objects.all().delete()
        Doctor.objects.all().delete()
        Patient.objects.all().delete()
        SystemAdmin.objects.all().delete()
        Researcher.objects.all().delete()

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
                status='Normal'
            )
            patient.password = make_password('patient1')
            patient.save()

            patient = Patient.objects.create(
                username='patient2',
                email='patient2@gmail.com',
                phone_number='99998888',
                name='patient2',
                status='Covid'
            )
            patient.password = make_password('patient2')
            patient.save()

            doctor = Doctor.objects.create(
                username='doctor1',
                email='doctor1@gmail.com',
                phone_number='88888888',
                name='doctor1'
            )
            doctor.password = make_password('doctor1')
            doctor.save()

            doctor = Doctor.objects.create(
                username='doctor2',
                email='doctor2@gmail.com',
                phone_number='88889888',
                name='doctor2'
            )
            doctor.password = make_password('doctor2')
            doctor.save()

            researcher = Researcher.objects.create(
                username='researcher1',
                email='researcher1@gmail.com',
                phone_number='77777777',
                name='researcher1'
            )
            researcher.password = make_password('researcher1')
            researcher.save()

            researcher = Researcher.objects.create(
                username='researcher2',
                email='researcher2@gmail.com',
                phone_number='77787777',
                name='researcher2'
            )
            researcher.password = make_password('researcher2')
            researcher.save()


            # Generate new users
            for i in range(10, 30):
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

'''
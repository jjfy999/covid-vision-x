from django.core.management.base import BaseCommand
from deepLearningModel.models import Report
from userAccount.models import Patient
from datetime import date

class Command(BaseCommand):
    help = 'Reset the database by removing all Report objects'

    def handle(self, *args, **options):
        # Delete all Report objects
        Report.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Successfully reset the database by removing all Report objects'))

        try: 


            
            patient = Patient.objects.get(pk=97)

            report = Report.objects.create(
                status="Normal",
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,  
                approved=True,
                image="abc.jpg",
            )

            patient = Patient.objects.get(pk=106)

            report = Report.objects.create(
                status="Covid",
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,  
                approved=True,
                image="abc.jpg",
            )

            patient = Patient.objects.get(pk=98)

            report = Report.objects.create(
                status="Normal",
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,  
                approved=False,
                image="abc.jpg",
            )

            patient = Patient.objects.get(pk=109)

            report = Report.objects.create(
                status="Normal",
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,  
                approved=False,
                image="abc.jpg",
            )


            patient = Patient.objects.get(pk=111)

            report = Report.objects.create(
                status="Normal",
                patient_name=patient.name,
                date=date.today(),
                patient_id=patient,  
                approved=False,
                image="abc.jpg",
            )




        except Patient.DoesNotExist:
            self.stdout.write(self.style.ERROR('Patient with id 93 does not exist'))




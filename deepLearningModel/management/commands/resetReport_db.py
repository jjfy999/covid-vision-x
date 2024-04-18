from django.core.management.base import BaseCommand
from deepLearningModel.models import Report

class Command(BaseCommand):
    help = 'Reset the database by removing all Report objects'

    def handle(self, *args, **options):
        # Delete all Report objects
        Report.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Successfully reset the database by removing all Report objects'))

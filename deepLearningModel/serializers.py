from rest_framework import serializers

from .models import Report


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report # Assuming Doctor and SystemAdmin have the same fields
        fields = '__all__'


class ReportApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['approved']
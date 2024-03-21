from rest_framework import serializers

from .models import Doctor, Patient, SystemAdmin


class DoctorSysAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor  # Assuming Doctor and SystemAdmin have the same fields
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class DoctorSysAdminUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        # Specify only the fields you want to update
        fields = ['username', 'email', 'name', 'phone_number', 'password']

    # Define the fields as not required
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    name = serializers.CharField(required=False)
    phone_number = serializers.CharField(required=False)
    password = serializers.CharField(required=False)

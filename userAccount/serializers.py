from rest_framework import serializers
from .models import Doctor, SystemAdmin, Patient

class DoctorSysAdminUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor  # Assuming Doctor and SystemAdmin have the same fields
        fields = ['id', 'name', 'email', 'phone_number', 'username', 'role']

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)  # Call the default update method
        
        # Call the update_Details method from the model
        new_username = validated_data.get('username')
        new_email = validated_data.get('email')
        new_phone_number = validated_data.get('phone_number')
        new_name = validated_data.get('name')
        instance.update_Details(new_username, new_email, new_phone_number, new_name)
        
        return instance


class PatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'email', 'phone_number', 'username', 'status']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.username = validated_data.get('username', instance.username)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
from rest_framework import serializers

from userAccount.models import Account


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Userfields = ['username', 'email',
                              'password', 'password2', 'name', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        password = self.validated_data['password']
        password2 = self.validated_date['password2']

        if password != password2:
            raise serializers.ValidationError(
                {"Error": "Password Does not match"})

        if Account.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError({"Error": "Email already exist"})

        account = Account(email=self.validated_data['email'], username=self.validated_data['username'],
                          name=self.validated_data['name'], phone_number=self.validated_data['phone_number'])
        account.set_password(password)
        account.save()
        return account


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

from accessControl.views import MyTokenObtainPairSerializer
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from userAccount.models import Account


class MyTokenObtainPairSerializerTest(TestCase):
    def setUp(self):
        self.user = Account.objects.create_user(
            username='testuser', password='testpass', email="test@test.com", phone_number="1234567890")
        self.user.role = 'admin'
        self.user.save()

    def test_get_token(self):
        token = MyTokenObtainPairSerializer.get_token(self.user)
        self.assertEqual(token['username'], 'testuser')
        self.assertEqual(token['role'], 'admin')

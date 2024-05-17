from accessControl.views import MyTokenObtainPairSerializer
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', password='testpass')
        self.user.role = 'admin'
        self.user.save()

    def test_get_token(self):
        token = MyTokenObtainPairSerializer.get_token(self.user)
        self.assertEqual(token['username'], 'testuser')
        self.assertEqual(token['role'], 'admin')


class GetRoutesTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_routes(self):
        response = self.client.get('/api/routes')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, ['/api/token', '/api/token/refresh'])

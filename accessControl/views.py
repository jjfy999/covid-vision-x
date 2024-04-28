from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.template.loader import get_template
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from userAccount.models import Account

from .serializers import UserLoginSerializer, UserRegisterSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['role'] = user.role
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class  = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)


class LoginView(APIView):
    def post(self, request):
        if request.method == 'POST':
            serializer = UserLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['username']
            password = serializer.validated_data['password']

            authenticated_user = authenticate(username=user, password=password)
            if authenticated_user is not None:
                login(request, authenticated_user)
                token, created = Token.objects.get_or_create(
                    user=authenticated_user)
                user_role = authenticated_user.role
                template_path = 'SysadminProfile.html'
                template = get_template(template_path)
                response_data = {
                    'token': token.key,
                    'redirect_url': template_path,
                    'role': user_role,
                }

                return JsonResponse(response_data, status=200)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class LogoutView(APIView):
    def post(self, request):
        if request.method == "POST":
            request.user.auth_token.delete()
        return Response({"Message": "You are logged out"}, status=status.HTTP_200_OK)


@api_view(["POST"])
def user_register_view(request):
    if request.method == "POST":
        serializer = UserRegisterSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            account = serializer.save()

            data['response'] = 'Account has been created'
            data['username'] = account.username
            data['email'] = account.email

            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

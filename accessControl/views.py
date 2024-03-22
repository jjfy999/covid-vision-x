from django.contrib.auth import authenticate, login
from django.shortcuts import render
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthTokenView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from userAccount.models import Account

from .serializers import UserLoginSerializer, UserRegisterSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['username']
        password = serializer.validate_data['password']

        authenticated_user = authenticate(username=user, password=password)
        if authenticated_user is not None:
            login(request, authenticated_user)
            token, created = Token.objects.get_or_create(
                user=authenticated_user)
            user_role = authenticated_user.role

            return Response({'token': token.key, 'role': user_role}, status=status.HTTP_200_CREATED)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        if request.method == "POST":
            request.user.auth_token.delete()
        return Response({"Message": "You are logged out"}, status=status.HTTP_200_OK)


@api_view({"POST"})
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

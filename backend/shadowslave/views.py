# backend/shadowslave/views.py

from django.shortcuts import render
from rest_framework import generics
from .models import Characters
from .serializers import CharactersSerializer, RegisterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Using RegisterSerializer for the registration view
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            # Save user data and create a user
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login view using JWT (already implemented by simplejwt)
class LoginView(TokenObtainPairView):
    # You don't need to implement anything here because `TokenObtainPairView`
    # automatically handles JWT login.
    pass

# Token Refresh view (used for refreshing JWT tokens)
class TokenRefreshView(TokenRefreshView):
    pass

# Characters List view for getting all characters
class CharactersList(generics.ListAPIView):
    queryset = Characters.objects.all()
    serializer_class = CharactersSerializer


from django.shortcuts import render
from rest_framework import generics
from .models import Characters
from .serializers import CharactersSerializer

# Create your views here.

class CharactersList(generics.ListAPIView):
    queryset = Characters.objects.all()
    serializer_class = CharactersSerializer
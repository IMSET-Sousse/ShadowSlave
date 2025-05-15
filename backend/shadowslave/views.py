from django.shortcuts import render
from rest_framework import generics
from .models import Character
from .serializers import CharacterSerializer

# Create your views here.

class CharacterList(generics.ListAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
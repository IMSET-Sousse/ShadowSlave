# characters/urls.py
from django.urls import path
from .views import CharactersList

urlpatterns = [
    path('', CharactersList.as_view(), name='character-list'),
]
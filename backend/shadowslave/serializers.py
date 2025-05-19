# characters/serializers.py
from rest_framework import serializers
from .models import Characters

class CharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characters
        fields = ['id', 'name', 'true_name', 'age', 'vital_status', 'rank', 'class_name', 'aspect', 'flaw', 'image']
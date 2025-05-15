# characters/serializers.py
from rest_framework import serializers
from .models import Character

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ['id', 'name', 'true_name', 'age', 'vital_status', 'rank', 'class_name', 'aspect', 'flaw', 'image']
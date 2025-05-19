# backend/shadowslave/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Characters
import re

class RegisterSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
    
    def validate(self, data):
        # Check that the passwords match
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        
        # Password strength validation (optional, you can modify this)
        if len(data['password']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        
        if not re.search(r"[A-Za-z]", data['password']):
            raise serializers.ValidationError("Password must contain at least one letter.")
        
        if not re.search(r"\d", data['password']):
            raise serializers.ValidationError("Password must contain at least one digit.")

        return data
    
    def create(self, validated_data):
        # Remove the password_confirm field as it's not needed in the user model
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characters
        fields = ['id', 'name', 'true_name', 'age', 'vital_status', 'rank', 'class_name', 'aspect', 'flaw', 'image']
    
    def validate_age(self, value):
        if value < 0:
            raise serializers.ValidationError("Age must be a positive number.")
        return value

    def validate_vital_status(self, value):
        if value not in ['Alive', 'Deceased', 'Unknown']:
            raise serializers.ValidationError("Vital status must be one of the following: 'Alive', 'Deceased', 'Unknown'.")
        return value


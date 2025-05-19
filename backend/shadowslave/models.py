from django.db import models

# Create your models here.
class Characters(models.Model):
    name = models.CharField(max_length=100)
    true_name = models.CharField(max_length=100, blank=True)
    age = models.CharField(max_length=50)  # e.g., "26(current)"
    vital_status = models.CharField(max_length=50)
    rank = models.CharField(max_length=100)  # e.g., "Saint(Transcendent)"
    class_name = models.CharField(max_length=100, blank=True)  # Renamed to avoid Python keyword
    aspect = models.CharField(max_length=100)
    flaw = models.CharField(max_length=100, blank=True)
    image = models.CharField(max_length=200, blank=True)  # Stores filename, e.g., "sunny_illustration.png"

    def __str__(self):
        return self.name
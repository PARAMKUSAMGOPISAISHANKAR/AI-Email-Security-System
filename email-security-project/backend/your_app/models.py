from django.db import models

class EmailScan(models.Model):
    email_text = models.TextField()
    label = models.CharField(max_length=50)
    confidence = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

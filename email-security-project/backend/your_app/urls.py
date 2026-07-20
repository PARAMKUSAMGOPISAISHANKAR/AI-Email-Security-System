from django.urls import path
from .views import home, analyze_email

urlpatterns = [
    path('', home, name='home'),
    path('api/analyze/', analyze_email, name='analyze_email'),
]
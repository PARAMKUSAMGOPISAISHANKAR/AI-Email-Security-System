from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health_check, name="detector-health"),
    path("analyze/", views.analyze_email_view, name="detector-analyze"),
]

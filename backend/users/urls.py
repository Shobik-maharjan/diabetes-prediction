from django.urls import path
from .views import diabetes_pre

urlpatterns = [
    path('diabetes-prediction/', diabetes_pre, name='diabetes_pre'),
    
]

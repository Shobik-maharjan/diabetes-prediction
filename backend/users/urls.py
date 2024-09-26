from django.urls import path
from .views import diabetes_pre, get_user_diabetes_data

urlpatterns = [
    path('diabetes-prediction/', diabetes_pre, name='diabetes_pre'),
    path('diabetesData/', get_user_diabetes_data, name='user_diabetes_data'),

]

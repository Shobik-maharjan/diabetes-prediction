from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import DiabetesData

User = get_user_model()


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password']


        
class DiabetesSerializer(serializers.Serializer):
    Pregnancies = serializers.FloatField()
    Glucose = serializers.FloatField()
    BloodPressure = serializers.FloatField()
    SkinThickness = serializers.FloatField()
    Insulin = serializers.FloatField()
    BMI = serializers.FloatField()
    DiabetesPedigreeFunction = serializers.FloatField()
    Age = serializers.FloatField()


class DiabetesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiabetesData
        fields = ['id', 'user', 'pregnancies', 'glucose', 'bloodpressure', 
                  'skinthickness', 'insulin', 'bmi', 'diabetes_pedigree_function', 'age', 'result']
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

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

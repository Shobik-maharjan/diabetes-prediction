from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.utils import timezone
import numpy as np

# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100)
    email = models.EmailField(_("Email Address"), max_length=254, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined =  models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    

class DiabetesData(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    pregnancies = models.FloatField()
    glucose = models.FloatField()
    bloodpressure = models.FloatField()
    skinthickness = models.FloatField()
    insulin = models.FloatField()
    bmi = models.FloatField()
    diabetes_pedigree_function = models.FloatField()
    age = models.FloatField()
    result = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"DiabetesData(age={self.age}, glucose={self.glucose})"
    
class SkinThicknessPredictor:

    def predict(self, Age, BMI, Glucose):
        # Prepare input features for prediction
        input_features = np.array([[Age, BMI, Glucose]])
        # Make prediction
        return self.model.predict(input_features)[0]  # Assuming the model returns a single value
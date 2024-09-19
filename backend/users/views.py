import pickle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from users.models import DiabetesData
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
# from django.contrib.auth.decorators import login_required


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
# @login_required
def diabetes_pre(request):
    if request.method == "POST":
        try:
            # Parse JSON data
            data = json.loads(request.body)
            pregnancies = float(data.get("Pregnancies", 0))
            glucose = float(data.get("Glucose", 0))
            bloodpressure = float(data.get("BloodPressure", 0))
            skinthickness = float(data.get("SkinThickness", 0))
            insulin = float(data.get("Insulin", 0))
            BMI = float(data.get("BMI", 0))
            DiabetesPedigreeFunction = float(data.get("DiabetesPedigreeFunction", 0))
            age = float(data.get("Age", 0))

            # Load the pre-trained model
            with open('diabetes.pkl', 'rb') as file:
                diabetes_model = pickle.load(file)
            
            # Load the scaler
            with open('scaler.pkl', 'rb') as file:
                scaler = pickle.load(file)

            # Prepare the input data
            input_data = [[pregnancies, glucose, bloodpressure, skinthickness, insulin, BMI, DiabetesPedigreeFunction, age]]

            # Scale the features
            scaled_data = scaler.transform(input_data)

            # Make prediction
            prediction = diabetes_model.predict(scaled_data)

            # Determine the result
            result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"

            # Return JSON response


            diabetes_data = DiabetesData(
                user=request.user,
                pregnancies=pregnancies,
                glucose=glucose,
                bloodpressure=bloodpressure,
                skinthickness=skinthickness,
                insulin=insulin,
                bmi=BMI,
                diabetes_pedigree_function=DiabetesPedigreeFunction,
                age=age,
                result=result,
            )
            diabetes_data.save()

            return JsonResponse({'result': result})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

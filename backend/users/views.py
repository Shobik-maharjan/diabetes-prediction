import pickle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.response import Response
from users.models import DiabetesData
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import DiabetesDataSerializer

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def diabetes_pre(request):
    if request.method == "POST":
        try:
            # Parse JSON data from the request body
            data = json.loads(request.body)
            pregnancies = float(data.get("Pregnancies", 0))
            glucose = float(data.get("Glucose", 0))
            bloodpressure = float(data.get("BloodPressure", 0))
            skinthickness = float(data.get("SkinThickness", 0))
            insulin = float(data.get("Insulin", 0))
            BMI = float(data.get("BMI", 0))
            DiabetesPedigreeFunction = float(data.get("DiabetesPedigreeFunction", 0))
            age = float(data.get("Age", 0))

            # Load the pre-trained logistic regression model
            with open('own_algo_diabetes.pkl', 'rb') as file:
                diabetes_model = pickle.load(file)
            
            # Load the scaler to scale input data
            with open('own_algo_scaler.pkl', 'rb') as file:
                scaler = pickle.load(file)

            # Prepare the input data for prediction
            input_data = [[pregnancies, glucose, bloodpressure, skinthickness, insulin, BMI, DiabetesPedigreeFunction, age]]
            
            # Scale the features before prediction
            scaled_data = scaler.transform(input_data)

            # Make prediction probabilities
            probabilities = diabetes_model.predict_proba(scaled_data)

            # Probabilities for both classes (0 = Not Diabetic, 1 = Diabetic)
            prob_not_diabetic = probabilities[0][0] * 100  # Probability of not having diabetes
            prob_diabetic = probabilities[0][1] * 100      # Probability of having diabetes

            # Get the predicted class (0 or 1)
            prediction = diabetes_model.predict(scaled_data)

            # Determine the result based on the prediction
            result = "Diabetic" if prediction[0] == 1 else "Not Diabetic"

            # Save the prediction in the database (optional)
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

            # Return a JSON response with both the prediction result and probabilities
            return JsonResponse({
                'result': result,
                'probability_diabetic': f"{prob_diabetic:.2f}%",  # Probability of diabetes
                'probability_not_diabetic': f"{prob_not_diabetic:.2f}%"  # Probability of not having diabetes
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_diabetes_data(request):
    user = request.user  # Get the currently authenticated user
    diabetes_data = DiabetesData.objects.filter(user=user)  # Filter records by user
    serializer = DiabetesDataSerializer(diabetes_data, many=True)  # Serialize the queryset
    return Response(serializer.data)
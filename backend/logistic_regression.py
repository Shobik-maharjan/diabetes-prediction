import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report

class LogisticRegression:
    def __init__(self, learning_rate=0.01, n_iterations=1000):
        self.learning_rate = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        
        # Initialize weights and bias
        self.weights = np.zeros(n_features)
        self.bias = 0

        # Gradient ascent
        for _ in range(self.n_iterations):
            linear_model = np.dot(X, self.weights) + self.bias
            y_predicted = self.sigmoid(linear_model)

            # Compute gradients
            dw = (1/n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1/n_samples) * np.sum(y_predicted - y)

            # Update weights and bias
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db

    def predict_proba(self, X):
        """Return probabilities of both classes: Not Diabetic (class 0) and Diabetic (class 1)"""
        linear_model = np.dot(X, self.weights) + self.bias
        prob_class_1 = self.sigmoid(linear_model)  # Probability of class 1 (Diabetic)
        prob_class_0 = 1 - prob_class_1            # Probability of class 0 (Not Diabetic)
        return np.vstack((prob_class_0, prob_class_1)).T  # Return both probabilities as a 2D array

    def predict(self, X):
        """Predict binary outcome"""
        probabilities = self.predict_proba(X)[:, 1]  # Use only the probability for class 1
        y_predicted = [1 if i > 0.5 else 0 for i in probabilities]
        return np.array(y_predicted)

# Main function to run the logistic regression
if __name__ == "__main__":
    # Load the cleaned dataset
    df = pd.read_csv("cleaned_data.csv")

    # Assuming 'Outcome' is the column with diabetes status (0 or 1)
    X = df.drop('Outcome', axis=1).values  # Features
    y = df['Outcome'].values  # Target variable

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    # Feature scaling
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Create and fit the Logistic Regression model
    model = LogisticRegression(learning_rate=0.1, n_iterations=1000)
    model.fit(X_train, y_train)

    # Predict on the test set
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)  # Get probabilities for both classes
    
    # Calculate accuracy
    acc = accuracy_score(y_test, predictions)
    print("Predictions:", predictions)
    print(f"Accuracy: {acc:.2f}%")
    
    # Show probabilities and results for both classes
    for i, (prob_0, prob_1) in enumerate(probabilities):
        diabetes_risk = prob_1 * 100
        non_diabetes_risk = prob_0 * 100
        
        if predictions[i] == 1:
            # Predicted as Diabetic
            print(f"Test sample {i+1}: Predicted as Diabetic")
            print(f"You have a {diabetes_risk:.2f}% chance of having diabetes.")
        else:
            # Predicted as Not Diabetic
            print(f"Test sample {i+1}: Predicted as Not Diabetic")
            print(f"You have a {non_diabetes_risk:.2f}% chance of NOT having diabetes.")
    
    # Additional metrics
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, predictions))
    print("Classification Report:")
    print(classification_report(y_test, predictions))

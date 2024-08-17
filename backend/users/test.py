import pickle

with open('diabetes.pkl', 'rb') as file:
    model = pickle.load(file)

print(type(model))
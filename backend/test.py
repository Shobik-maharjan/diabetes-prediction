import pickle

with open('own_algo_diabetes.pkl', 'rb') as file:
    model = pickle.load(file)

print(type(model))
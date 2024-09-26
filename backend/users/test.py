import pickle

with open('diabees.pkl', 'rb') as file:
    model = pickle.load(file)

print(type(model))
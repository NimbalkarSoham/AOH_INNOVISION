import pandas as pd
import pickle


with open('price_predict_agrifarm.pkl', 'rb') as f:
    model = pickle.load(f)

def predict_price(age_of_machine, fuel_consumption, rental_duration, equipment_type, equipment_name):
    # Create DataFrame with input data
    input_data = pd.DataFrame({
        'Age_of_Machine': [age_of_machine],
        'Fuel_Consumption': [fuel_consumption],
        'Rental_Duration': [rental_duration],
        'Equipment_Type_Harvester': [0],
        'Equipment_Type_Plough': [0],
        'Equipment_Type_Seeder': [0],
        'Equipment_Type_Sprayer': [0],
        'Equipment_Type_Tractor': [0],
        'Equipment_Name_Model A': [0],
        'Equipment_Name_Model B': [0],
        'Equipment_Name_Model C': [0],
        'Equipment_Name_Model D': [0],
        'Equipment_Name_Model E': [0]
    })

    # Map selected equipment type and name to 1
    input_data['Equipment_Type_' + equipment_type] = 1
    input_data['Equipment_Name_' + equipment_name] = 1

    # Make prediction
    predicted_price = model.predict(input_data)

    return predicted_price[0]


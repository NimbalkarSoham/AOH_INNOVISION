from flask import Flask, request, jsonify
import os
import pandas as pd
import pickle

app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')

pickel_path="C:/Users/daras/price_predict_agrifarm.pkl"


with open(pickel_path, 'rb') as f:
    model = pickle.load(f)
# rout for price prediction
@app.route('/price', methods=['GET'])
def predict_price():
    data = request.json
    age_of_machine = int(data.get('age_of_machine', 0))
    fuel_consumption = float(data.get('fuel_consumption', 0))
    rental_duration = int(data.get('rental_duration', 0))
    equipment_type = data.get('equipment_type', '')
    equipment_name = data.get('equipment_name', '')

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

    input_data['Equipment_Type_' + equipment_type] = 1
    input_data['Equipment_Name_' + equipment_name] = 1
    predicted_price = model.predict(input_data)

    return jsonify({'predicted_price': predicted_price[0]})

if __name__ == '__main__':
    app.run(debug=True)
import pandas as pd
import pickle
import os
from flask import request, jsonify

# Load the pipeline model
models_folder = os.path.join(os.path.dirname(__file__), '../models')
pickle_file_path = os.path.join(models_folder, 'pipeline_tool_model.pkl')

with open(pickle_file_path, 'rb') as model_file:
    pipeline_model = pickle.load(model_file)

def predict_tools():
    # Get data from request
    data = request.json
    activity = data['Activity']
    duration = data['Duration']
    budget = data['Budget']

    # Prepare input data for prediction
    input_data = pd.DataFrame({'Activity': [activity], 'Duration (days)': [duration], 'Budget (USD)': [budget]})
    
    # Predict equipment/tool
    predicted_equipment = pipeline_model.predict(input_data)
    
    # Return prediction in JSON format
    return jsonify({'Predicted_Tools': predicted_equipment[0]})

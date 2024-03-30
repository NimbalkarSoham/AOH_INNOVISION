from flask import Flask, request, jsonify
import os
import pandas as pd
import pickle
from models.price_prediction import predict_price
from flask_cors import CORS

app = Flask(__name__)
app = Flask(__name__, static_url_path='/static')

CORS(app)


# rout for price prediction
@app.route('/price', methods=['POST'])
def get_predicted_price():
    print("route called")
    data = request.json
    predicted_price = predict_price(data)
    return jsonify({'predicted_price': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
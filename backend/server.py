from flask import Flask, request, jsonify
import os
import pandas as pd
import pickle
from controllers.price_prediction import predict_price
from flask_cors import CORS
# from models.tool_predict import predict_tools
from controllers.plant_disease import predict_image
from controllers.utils import disease_dic
from controllers.review_analyser import predict_rating


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


@app.route('/analyse-review', methods=['POST'])
def get_review_rating():
    print("review route called")
    data = request.json
    review = data.get('review', '')
    rating = predict_rating(review)
    print(rating)
    return jsonify({'rating': int(rating)})

# @app.route('/toolpredict', methods=['POST'])
# def predict_tool():
#     print("route called")
#     data = request.json
#     predicted_equipment = predict_tools(data)
#     return predicted_equipment


@app.route('/predict-disease', methods=['GET', 'POST'])
def predict_disease():
    if request.method == 'POST':
        try:
            file = request.files['file']
            img = file.read()
            prediction = predict_image(img)
            print(prediction)
            print(disease_dic[prediction])
            res = disease_dic[prediction]
            return jsonify({'predicted_price': prediction, 'description': res})
        except:
            pass


if __name__ == '__main__':
    app.run(debug=True)

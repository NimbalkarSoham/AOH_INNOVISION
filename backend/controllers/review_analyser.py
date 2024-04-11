import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

def predict_rating(data):
    # Load the trained model
    classifier = joblib.load('./models/reviews_sentiment_model.pkl')
    vectorizer = joblib.load('./models/tfidf_vectorizer.pkl')
    
    # Convert the review text into numerical features using TF-IDF Vectorizer
    review_vect = vectorizer.transform([data])
    
    # Predict sentiment rating
    rating = classifier.predict(review_vect)
    
    return rating[0]
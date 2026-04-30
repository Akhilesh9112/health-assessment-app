from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import numpy as np
import pickle
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only; change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + preprocessors
model = tf.keras.models.load_model("emotion_model.h5")
with open("tokenizer.pkl", "rb") as f:
    tokenizer = pickle.load(f)
with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Pydantic model for request
class TextInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Emotion Prediction API is running!"}

# ✅ Route for prediction
@app.post("/predict_emotion")
def predict_emotion(data: TextInput):
    seq = tokenizer.texts_to_sequences([data.text])
    padded = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    prediction = model.predict(padded)
    predicted_label = np.argmax(prediction, axis=1)
    emotion = label_encoder.inverse_transform(predicted_label)[0]
    return {"emotion": emotion}   # ✅ simplified response

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

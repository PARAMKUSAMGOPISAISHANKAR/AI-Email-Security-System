import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "phishing.csv")
MODEL_PATH = os.path.join(BASE_DIR, "phishing_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "phishing_vectorizer.pkl")

data = pd.read_csv(DATASET_PATH)
data = data.dropna()
data["text"] = data["text"].astype(str)
data["label"] = data["label"].map({"spam": 1, "ham": 0})

X = data["text"]
y = data["label"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

vectorizer = TfidfVectorizer(lowercase=True, stop_words="english", ngram_range=(1, 2))
X_train_v = vectorizer.fit_transform(X_train)
X_test_v = vectorizer.transform(X_test)

model = LogisticRegression(max_iter=1000)
model.fit(X_train_v, y_train)

preds = model.predict(X_test_v)
print("Phishing model accuracy:", round(accuracy_score(y_test, preds) * 100, 2))
print(classification_report(y_test, preds, zero_division=0))

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)
print("Saved phishing_model.pkl and phishing_vectorizer.pkl")

import os
import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# Get current folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(BASE_DIR, "spam.csv")
MODEL_PATH = os.path.join(BASE_DIR, "spam_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "spam_vectorizer.pkl")


# Load dataset
data = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")
print(data.head())


# Remove empty rows
data = data.dropna()

# Convert text to string
data["text"] = data["text"].astype(str)

# Convert labels
data["label"] = data["label"].map({
    "spam": 1,
    "ham": 0
})


# Features and target
X = data["text"]
y = data["label"]


# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# Create TF-IDF Vectorizer
vectorizer = TfidfVectorizer(
    lowercase=True,
    stop_words="english",
    ngram_range=(1, 2)
)


# Train vectorizer
X_train_vectorized = vectorizer.fit_transform(X_train)

# Transform test data
X_test_vectorized = vectorizer.transform(X_test)


# Create Logistic Regression model
model = LogisticRegression(
    max_iter=1000
)


# Train model
model.fit(
    X_train_vectorized,
    y_train
)


# Test model
predictions = model.predict(
    X_test_vectorized
)


# Calculate accuracy
accuracy = accuracy_score(
    y_test,
    predictions
)


print("\nModel Accuracy:")
print(f"{accuracy * 100:.2f}%")


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        predictions,
        zero_division=0
    )
)


# Save trained model
joblib.dump(
    model,
    MODEL_PATH
)


# Save vectorizer
joblib.dump(
    vectorizer,
    VECTORIZER_PATH
)


print("\nTraining completed!")

print(
    "Model saved:",
    MODEL_PATH
)

print(
    "Vectorizer saved:",
    VECTORIZER_PATH
)
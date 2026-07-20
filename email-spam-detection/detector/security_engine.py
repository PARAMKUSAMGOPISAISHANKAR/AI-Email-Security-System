from __future__ import annotations

import os
import pickle
import re
from pathlib import Path
from typing import Any

import joblib

BASE_DIR = Path(__file__).resolve().parent.parent
ML_DIR = BASE_DIR / "ml_model"

SPAM_MODEL_PATH = ML_DIR / "spam_model.pkl"
SPAM_VECTORIZER_PATH = ML_DIR / "spam_vectorizer.pkl"
PHISH_MODEL_PATH = ML_DIR / "phishing_model.pkl"
PHISH_VECTORIZER_PATH = ML_DIR / "phishing_vectorizer.pkl"


def _load_artifact(path: Path):
    if not path.exists():
        raise FileNotFoundError(f"Missing model artifact: {path}")
    return joblib.load(path)


def _load_spam_classifier():
    model = _load_artifact(SPAM_MODEL_PATH)
    vectorizer = _load_artifact(SPAM_VECTORIZER_PATH)
    return model, vectorizer


def _load_phishing_classifier():
    model = _load_artifact(PHISH_MODEL_PATH)
    vectorizer = _load_artifact(PHISH_VECTORIZER_PATH)
    return model, vectorizer


def analyze_email(content: str) -> dict[str, Any]:
    text = (content or "").strip()
    if not text:
        return {
            "prediction": "safe",
            "confidence": 0.0,
            "risk_level": "Low",
            "reasons": ["No content provided"],
            "subject": "Untitled email",
            "snippet": "",
        }

    lower = text.lower()
    suspicious_keywords = [
        "free", "winner", "urgent", "verify", "click here", "bank", "password",
        "bitcoin", "gift card", "limited time", "claim", "invoice", "account"
    ]
    matches = [kw for kw in suspicious_keywords if kw in lower]
    links = re.findall(r"https?://\S+|www\.\S+", text)
    has_exclamation = "!" in text
    has_caps = bool(re.findall(r"\b[A-Z]{4,}\b", text))

    heuristics_score = len(matches) * 12 + len(links) * 8 + (1 if has_exclamation else 0) * 5 + (1 if has_caps else 0) * 4
    probability = min(99.0, max(3.0, heuristics_score))
    spam = probability >= 55

    reasons = []
    if matches:
        reasons.append("Contains suspicious keywords")
    if links:
        reasons.append("Includes suspicious links")
    if has_exclamation:
        reasons.append("Uses urgent or alarming phrasing")
    if not reasons:
        reasons.append("No clear threat signals detected")

    prediction = "spam" if spam else "safe"
    confidence = round(min(99.0, max(55.0, probability)), 2)
    risk_level = "High" if spam and probability > 80 else "Medium" if spam else "Low"

    try:
        model, vectorizer = _load_spam_classifier()
        transformed = vectorizer.transform([text])
        prediction_score = model.predict_proba(transformed)[0]
        spam_score = float(prediction_score[1]) if len(prediction_score) > 1 else float(prediction_score[0])
        confidence = round(max(confidence, spam_score * 100), 2)
        if spam_score > 0.6:
            prediction = "spam"
            risk_level = "High" if spam_score > 0.85 else "Medium"
        else:
            prediction = "safe"
            risk_level = "Low"
    except FileNotFoundError:
        pass

    return {
        "prediction": prediction,
        "confidence": confidence,
        "risk_level": risk_level,
        "reasons": reasons,
        "subject": text.splitlines()[0][:80] if text.splitlines() else "Untitled email",
        "snippet": text[:140],
    }

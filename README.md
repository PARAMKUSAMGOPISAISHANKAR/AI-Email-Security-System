# 🛡️ AI-Powered Email Security and Threat Detection System

An AI/ML-powered full-stack web application designed to analyze email content and identify potential email threats such as **Spam, Phishing, Suspicious, and Promotional emails**.

The system combines **Machine Learning, Natural Language Processing (NLP), TF-IDF, URL Analysis, and Security Rules** to analyze emails and provide a final classification, confidence score, risk score, risk level, and an explanation of detected threats.

The application uses **React + TypeScript** for the frontend and **Django + Django REST Framework** for the backend.

---

# 📌 Project Overview

Email-based attacks such as spam and phishing are common cybersecurity threats. Traditional spam filters may only classify an email as spam or non-spam.

This project aims to build a more comprehensive email security system that analyzes multiple indicators.

The system can analyze:

- Email text content
- Spam patterns
- Phishing patterns
- Suspicious URLs
- Urgent language
- Credential requests
- Financial requests
- Promotional content

The final result can classify an email as:

- ✅ Safe
- ⚠️ Spam
- 🚨 Phishing
- 🕵️ Suspicious
- 📢 Promotional

---

# 🎯 Project Objectives

The main objectives of this project are:

1. Detect spam emails using Machine Learning.
2. Identify potential phishing emails.
3. Analyze suspicious URLs contained in emails.
4. Detect suspicious phrases using security rules.
5. Use NLP techniques to process email text.
6. Calculate a security risk score.
7. Provide an explanation for detected threats.
8. Store email scan history.
9. Display email security analytics on a dashboard.
10. Provide a responsive full-stack web application.

---

# ✨ Key Features

## 🤖 AI/ML Email Classification

Uses Machine Learning models to classify email content.

Current/Planned classifications:

- Safe
- Spam
- Phishing
- Suspicious
- Promotional

---

## 📝 NLP Email Processing

The system processes email text using Natural Language Processing techniques.

The processing pipeline includes:

- Text normalization
- Text cleaning
- TF-IDF feature extraction
- Machine Learning classification

Example:

```text
Email Text
    ↓
Text Processing
    ↓
TF-IDF Vectorization
    ↓
ML Model
    ↓
Prediction
```

---

## ⚠️ Spam Detection

The spam detection module uses:

- TF-IDF Vectorizer
- Logistic Regression

The model is trained using labeled email data.

Example classes:

```text
ham  → Safe / Non-Spam
spam → Spam
```

Example result:

```text
Prediction: Spam
Confidence: 94%
```

---

## 🎣 Phishing Detection

The phishing detection module analyzes email content for potential phishing attempts.

It can identify indicators such as:

- Account verification requests
- Password requests
- Banking information requests
- Account suspension threats
- Urgent action requests
- Suspicious links

Example:

```text
Your account has been suspended.

Verify your account immediately.

Enter your username and password using the link below.
```

Possible result:

```text
Classification: Phishing
Risk Level: Critical
```

---

## 🔗 URL Analysis

The system extracts URLs from email content and analyzes static URL characteristics.

Potential indicators include:

- Unusually long URLs
- IP addresses used instead of domains
- Excessive subdomains
- Suspicious keywords
- URL shortening patterns
- Unusual URL structures

The application does not need to open potentially malicious URLs to perform basic static analysis.

---

## 🔐 Security Rule Engine

The Security Rule Engine detects suspicious patterns.

Examples:

| Security Pattern | Example |
|---|---|
| Urgency | Act immediately |
| Prize Scam | You have won ₹50,000 |
| Credential Request | Enter your password |
| Financial Request | Enter your bank details |
| Account Threat | Your account will be suspended |
| Suspicious Link | Unknown verification URL |

These security signals are used as additional inputs for risk analysis.

---

## 🚨 AI Risk Engine

The Risk Engine combines results from multiple security modules.

```text
Spam Detection
      │
      ├─────────┐
      │         │
Phishing ───────┤
                │
URL Analysis ───┼────► Risk Engine ────► Risk Score
                │
Security Rules ─┤
                │
      └─────────┘
```

Example result:

```text
Risk Score: 92/100
Risk Level: Critical
```

Example risk levels:

| Risk Score | Risk Level |
|---|---|
| 0–25 | Low |
| 26–50 | Medium |
| 51–75 | High |
| 76–100 | Critical |

> Note: The risk score is a system-generated security score. It should not be interpreted as a calibrated ML probability unless the scoring methodology has been formally validated.

---

## 🔍 Explainable Threat Detection

The application explains why an email was flagged.

Example:

```text
🚨 EMAIL THREAT DETECTED

Classification: PHISHING

AI Confidence: 95%
Risk Score: 92/100
Risk Level: CRITICAL

Why was this email flagged?

⚠️ Suspicious URL detected
⚠️ Urgent language detected
⚠️ Credential request detected
⚠️ Account suspension threat detected
```

---

# 🏗️ System Architecture

```text
                      USER
                       │
                       ▼
              ┌─────────────────┐
              │ React Web App   │
              └────────┬────────┘
                       │
                  REST API
                       │
                       ▼
              ┌─────────────────┐
              │ Django Backend  │
              └────────┬────────┘
                       │
                       ▼
             ┌───────────────────┐
             │ Email Processing  │
             └─────────┬─────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   NLP + TF-IDF   URL Analysis   Security Rules
        │              │              │
        ▼              │              │
   Spam Model          │              │
        │              │              │
   Phishing Model      │              │
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
                ┌─────────────┐
                │ Risk Engine │
                └──────┬──────┘
                       │
                       ▼
         ┌───────────────────────────┐
         │       FINAL RESULT        │
         │                           │
         │ Safe / Spam / Phishing   │
         │ Suspicious / Promotional │
         │                           │
         │ Confidence Score         │
         │ Risk Score               │
         │ Risk Level               │
         │ Explanation              │
         └─────────────┬─────────────┘
                       │
                       ▼
                Django Database
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        Scan History      Security Dashboard
```

---

# 🔄 Application Workflow

## Step 1: Email Input

The user enters email content by:

- Pasting email text
- Uploading a `.txt` file
- Uploading an `.eml` file (planned/optional)

Example:

```text
Subject: Urgent Account Verification

Dear Customer,

Your account has been suspended.

Please verify your account immediately.

Click the link below and enter your username and password.
```

---

## Step 2: React Frontend

The React frontend collects the email content and sends it to the Django backend.

Example API request:

```json
{
    "email_text": "Your account has been suspended. Verify your account immediately."
}
```

---

## Step 3: Django REST API

Django receives the email through the REST API.

Example endpoint:

```text
POST /api/predict/
```

Django coordinates the ML and security analysis modules.

---

## Step 4: NLP Processing

The email content is processed and transformed using TF-IDF.

```text
Email
  ↓
Text Processing
  ↓
TF-IDF
  ↓
Numerical Features
```

---

## Step 5: Machine Learning Prediction

The ML models analyze the processed email.

```text
TF-IDF Features
      ↓
Spam Model
      +
Phishing Model
      ↓
ML Predictions
```

---

## Step 6: Security Analysis

The system performs:

- URL analysis
- Suspicious keyword analysis
- Urgency detection
- Credential request detection
- Financial information request detection

---

## Step 7: Risk Calculation

The Risk Engine combines available security signals.

It generates:

- Classification
- Confidence score
- Risk score
- Risk level
- Detection reasons

---

## Step 8: Display Result

Example:

```text
Classification: Phishing

Confidence: 95%

Risk Score: 92/100

Risk Level: Critical

Reasons:

- Suspicious URL detected
- Urgent language detected
- Credential request detected
```

---

## Step 9: Store Scan History

Django stores the analysis result in the database.

Stored information may include:

```text
User
Email Subject
Email Content
Classification
Confidence
Risk Score
Risk Level
Analysis Date
```

---

## Step 10: Security Dashboard

Users can view:

- Total emails scanned
- Safe emails
- Spam detected
- Phishing detected
- Suspicious emails
- Recent scans
- Threat trends
- Scan history

---

# 🛠️ Technology Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Recharts

## Backend

- Python
- Django
- Django REST Framework

## Machine Learning

- Scikit-learn
- Logistic Regression
- TF-IDF Vectorizer
- Pandas
- NumPy
- Joblib

## NLP

- Text preprocessing
- TF-IDF feature extraction

## Database

Development:

- SQLite

Production options:

- PostgreSQL
- MySQL

## API

- REST API
- JSON

---

# 📁 Project Structure

```text
email-spam-detection/
│
├── detector/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── security_engine.py
│
├── ml_model/
│   ├── spam.csv
│   ├── phishing.csv
│   ├── train_model.py
│   ├── train_phishing.py
│   ├── evaluate_models.py
│   ├── spam_model.pkl
│   ├── vectorizer.pkl
│   ├── phishing_model.pkl
│   └── phishing_vectorizer.pkl
│
├── spam_project/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── venv/
│
├── manage.py
├── requirements.txt
│
└── spam-detector/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   │   ├── Dashboard.tsx
    │   │   ├── EmailAnalyzer.tsx
    │   │   ├── History.tsx
    │   │   ├── Analytics.tsx
    │   │   ├── Login.tsx
    │   │   └── Register.tsx
    │   │
    │   ├── services/
    │   │   └── api.ts
    │   │
    │   ├── App.tsx
    │   └── main.tsx
    │
    ├── package.json
    └── .env
```

---

# ⚙️ Installation and Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd email-spam-detection
```

---

# 🐍 Backend Setup

## 2. Create Virtual Environment

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

macOS/Linux:

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install django djangorestframework django-cors-headers scikit-learn pandas numpy joblib
```

---

## 4. Train Spam Detection Model

Make sure the training dataset and training script are available.

Run:

```bash
python ml_model/train_model.py
```

The training process generates:

```text
spam_model.pkl
vectorizer.pkl
```

---

## 5. Train Phishing Detection Model

If the phishing module has been implemented:

```bash
python ml_model/train_phishing.py
```

Expected generated files:

```text
phishing_model.pkl
phishing_vectorizer.pkl
```

---

## 6. Create Database

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 7. Create Admin User

```bash
python manage.py createsuperuser
```

---

## 8. Run Django Backend

```bash
python manage.py runserver
```

Backend development server:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Frontend Setup

Open a second terminal.

Navigate to the React frontend:

```bash
cd spam-detector
```

Install packages:

```bash
npm install
```

Create a `.env` file:

```text
VITE_API_URL=http://127.0.0.1:8000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend development server:

```text
http://localhost:5173
```

---

# 🔗 API Endpoints

Example API structure:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/predict/` | Analyze email |
| GET | `/api/history/` | Get scan history |
| GET | `/api/analytics/` | Get security analytics |

Additional authentication endpoints can be added for login and registration.

---

# 📧 Example Safe Email

```text
Subject: Project Meeting Tomorrow

Hi Team,

This is a reminder that our project meeting is scheduled
for tomorrow at 10:00 AM.

Please bring your project reports.

Thank you,
Project Manager
```

Possible result:

```text
Classification: Safe
Risk Level: Low
```

---

# ⚠️ Example Spam Email

```text
Subject: Congratulations!

You have been selected as today's lucky winner.

You have won ₹50,000 and a free smartphone.

Claim your reward immediately!
```

Possible result:

```text
Classification: Spam
Risk Level: High
```

---

# 🚨 Example Phishing Email

```text
Subject: Urgent Account Verification

Dear Customer,

Your account has been suspended.

Verify your account immediately.

Enter your username and password using the link below.

https://fake-bank-login.example
```

Possible result:

```text
Classification: Phishing
Risk Level: Critical
```

---

# 📊 Machine Learning Model

The initial spam classifier uses:

```text
Email Dataset
      ↓
Training / Testing Split
      ↓
TF-IDF Vectorization
      ↓
Logistic Regression
      ↓
Model Evaluation
      ↓
Save Model
      ↓
spam_model.pkl
```

For stronger experimental evaluation, multiple algorithms can be compared:

- Logistic Regression
- Multinomial Naive Bayes
- Support Vector Machine
- Random Forest

Recommended evaluation metrics:

- Accuracy
- Precision
- Recall
- F1-Score
- Confusion Matrix

---

# ✅ Advantages

- AI/ML-based email classification
- Automated spam detection
- Potential phishing detection
- Suspicious URL analysis
- Explainable security results
- Risk scoring
- Scan history
- Security dashboard
- Responsive web interface
- Full-stack architecture

---

# ❌ Limitations

- Model performance depends on training data quality.
- False positives and false negatives are possible.
- New phishing techniques may not be detected immediately.
- Static URL analysis cannot detect every malicious website.
- Models require retraining as threat patterns change.
- A prediction of "Safe" does not guarantee that an email is harmless.
- Production deployment requires strong privacy and data-security controls.

---

# 🔮 Future Enhancements

Future versions can include:

- Email attachment malware analysis
- Sender reputation analysis
- Email header analysis
- SPF/DKIM/DMARC signal integration
- Advanced phishing detection
- Transformer-based NLP models
- Multi-language email detection
- Real-time email provider integration
- Organization-level security dashboards
- Automated threat alerts
- Model monitoring and retraining pipelines

---

# 🎓 Project Category

**AI/ML-Based Full-Stack Web Application**

The project combines:

```text
Artificial Intelligence
        +
Machine Learning
        +
Natural Language Processing
        +
Cybersecurity
        +
Full-Stack Web Development
```

---

# 👨‍💻 Project Title

## AI-Powered Email Security and Threat Detection System

**Technologies:** Python, Django, Django REST Framework, React, TypeScript, Scikit-learn, NLP, TF-IDF and Machine Learning.

---

# ⚠️ Disclaimer

This project is intended for educational and research purposes.

The system's predictions should not be considered a guarantee that an email is safe or malicious. A production-grade email security platform requires additional controls such as sender authentication, reputation analysis, attachment scanning, threat intelligence, secure infrastructure, continuous monitoring, and regularly updated detection models.

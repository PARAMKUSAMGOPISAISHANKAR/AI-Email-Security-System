import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def home(request):
    return JsonResponse({
        'message': 'Email security API is running'
    })


@csrf_exempt
def analyze_email(request):
    if request.method != 'POST':
        return JsonResponse(
            {'detail': 'Only POST requests are allowed'},
            status=405
        )

    try:
        data = json.loads(request.body)

        content = data.get('content', '').strip()

        if not content:
            return JsonResponse(
                {'detail': 'Email content is required'},
                status=400
            )

        # Temporary basic spam detection for API testing
        spam_keywords = [
            'congratulations',
            'winner',
            'won',
            'cash prize',
            'claim your reward',
            'click here',
            'act now',
            'urgent',
            'free money',
            'account details',
        ]

        content_lower = content.lower()

        matched_keywords = [
            word for word in spam_keywords
            if word in content_lower
        ]

        if matched_keywords:
            prediction = 'spam'
            confidence = 85
            risk_level = 'High'

            reasons = [
                f'Suspicious keyword detected: {word}'
                for word in matched_keywords
            ]
        else:
            prediction = 'safe'
            confidence = 90
            risk_level = 'Low'
            reasons = [
                'No common spam keywords detected'
            ]

        return JsonResponse({
            'prediction': prediction,
            'confidence': confidence,
            'risk_level': risk_level,
            'reasons': reasons,
            'subject': 'Email Analysis',
            'snippet': content[:100],
        })

    except json.JSONDecodeError:
        return JsonResponse(
            {'detail': 'Invalid JSON data'},
            status=400
        )

    except Exception as error:
        return JsonResponse(
            {'detail': str(error)},
            status=500
        )
from __future__ import annotations

import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .security_engine import analyze_email
from .serializers import serialize_scan


def health_check(request):
    return JsonResponse({"status": "ok", "service": "email-spam-detector"})


@csrf_exempt
def analyze_email_view(request):
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    try:
        payload = json.loads(request.body or b"{}")
    except json.JSONDecodeError:
        return JsonResponse({"detail": "Invalid JSON body"}, status=400)

    content = payload.get("content") or payload.get("email") or payload.get("text") or ""
    result = analyze_email(content)
    return JsonResponse(serialize_scan(result))

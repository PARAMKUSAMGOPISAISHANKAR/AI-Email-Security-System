from django.http import JsonResponse


def home(request):
    return JsonResponse({'message': 'Email security API is running'})

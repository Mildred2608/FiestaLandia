from django.http import JsonResponse

def prueba(request):
    return JsonResponse({"ok": True})

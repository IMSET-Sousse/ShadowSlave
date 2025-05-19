from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Add this function to handle root URL
def api_root(request):
    return JsonResponse({"message": "Welcome to the ShadowSlave API"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/shadowslave/', include('shadowslave.urls')),
    path('', api_root),  # root URL
]

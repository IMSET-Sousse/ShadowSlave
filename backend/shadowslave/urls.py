# backend/shadowslave/urls.py

from django.urls import path
from .views import RegisterView, LoginView, TokenRefreshView, CharactersList

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Register endpoint
    path('login/', LoginView.as_view(), name='login'),  # Login (JWT)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh
    path('characters/', CharactersList.as_view(), name='characters_list'),  # Get characters
]

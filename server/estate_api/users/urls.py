from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView

urlpatterns = [
    path("login", LoginView.as_view(), name="login_view"),
    path("logout", LogoutView.as_view(), name="logout_view")
]
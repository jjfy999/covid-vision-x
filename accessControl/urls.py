from django.urls import path

from .views import LoginView, LogoutView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout_user/", LogoutView.as_view(), name="logout_user")
]

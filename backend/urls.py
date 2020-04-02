from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('', include('trip_helper.urls')),
]

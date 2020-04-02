from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('admin/', admin.site.urls),
    path('api/', include('trip_helper.urls')),
    path('token-auth/', obtain_jwt_token),
]

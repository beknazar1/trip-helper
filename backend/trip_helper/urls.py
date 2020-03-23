from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import current_user, UserList

urlpatterns = format_suffix_patterns([
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
])

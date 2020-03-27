from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import current_user, UserList, TripViewSet

trip_list = TripViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
trip_detail = TripViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('trips/', trip_list, name='trip-list'),
    path('trips/<int:pk>', trip_detail, name='trip-detail'),
])

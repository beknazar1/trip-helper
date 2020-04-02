from django.urls import path, include
from .views import current_user, UserList, TripViewSet, GoogleMapsImage, DarkSkyWeather, ReactAppView

trip_list = TripViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
trip_detail = TripViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('api/current_user/', current_user),
    path('api/users/', UserList.as_view()),
    path('api/trips/', trip_list, name='trip-list'),
    path('api/trips/<int:pk>', trip_detail, name='trip-detail'),
    path('api/images/', GoogleMapsImage.as_view(), name="get-image"),
    path('api/weather/', DarkSkyWeather.as_view(), name="get-weather"),
    path('', ReactAppView.as_view(), name='index'),
]

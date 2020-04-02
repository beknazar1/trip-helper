import os

import requests
from django.http import HttpResponse
from googlemaps import Client
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Trip
from .serializers import UserSerializer, UserSerializerWithToken, TripSerializer


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def perform_create(self, serializer):
        gmaps = Client(key=os.environ['GOOGLE_MAPS_KEY'])
        origin_city = f"{serializer.validated_data['origin_city']}, {serializer.validated_data['origin_state']}"
        destination_city = f"{serializer.validated_data['destination_city']}, {serializer.validated_data['destination_state']}"
        origin_gmaps = gmaps.find_place(origin_city, 'textquery', fields=['geometry', 'formatted_address'])
        destination_gmaps = gmaps.find_place(destination_city, 'textquery', fields=['geometry', 'formatted_address'])
        serializer.save(
            owner=self.request.user,
            origin_lat=origin_gmaps['candidates'][0]['geometry']['location']['lat'],
            origin_lon=origin_gmaps['candidates'][0]['geometry']['location']['lng'],
            destination_lat=destination_gmaps['candidates'][0]['geometry']['location']['lat'],
            destination_lon=destination_gmaps['candidates'][0]['geometry']['location']['lng'],
        )

    def get_queryset(self):
        owner_queryset = self.queryset.filter(owner=self.request.user)
        return owner_queryset


class GoogleMapsImage(APIView):
    """
    Get static images from Google Maps Static API
    """

    def get(self, request):
        city = request.query_params['city']
        gmaps = Client(key=os.environ['GOOGLE_MAPS_KEY'])
        image = gmaps.static_map(center=city, size=600, zoom=12)
        return HttpResponse(image, content_type="image/png", status=200)


class DarkSkyWeather(APIView):
    """
    Fetch weather info from DarkSky
    """

    def get(self, request):
        params = request.query_params
        lat = params['lat']
        lon = params['lon']
        date = f"{params['date']}T12:00:00"
        key = os.environ['DARK_SKY_KEY']
        r = requests.get(
            f"https://api.darksky.net/forecast/{key}/{lat},{lon},{date}?exclude=currently,hourly,minutely,alerts,flags")
        return Response(data=r.json(), status=r.status_code)

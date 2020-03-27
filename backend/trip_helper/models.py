from django.db import models


class Trip(models.Model):
    name = models.CharField(max_length=200)
    scheduled_date = models.DateField()
    origin_city = models.CharField(max_length=200)
    origin_state = models.CharField(max_length=2)
    origin_lat = models.DecimalField(max_digits=9, decimal_places=6)
    origin_lon = models.DecimalField(max_digits=9, decimal_places=6)
    destination_city = models.CharField(max_length=200)
    destination_state = models.CharField(max_length=2)
    destination_lat = models.DecimalField(max_digits=9, decimal_places=6)
    destination_lon = models.DecimalField(max_digits=9, decimal_places=6)
    owner = models.ForeignKey('auth.User', related_name='trips', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}: {self.origin_city} to {self.destination_city}'

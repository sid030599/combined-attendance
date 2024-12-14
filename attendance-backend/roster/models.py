from django.db import models
from users.models import User

class Shift(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()


class UserShiftMapping(models.Model):
    day_of_week = models.CharField(max_length=10, default='Monday')
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    

class WeeklyOff(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=10)
    shift = models.ForeignKey(Shift, on_delete=models.DO_NOTHING, default=1)
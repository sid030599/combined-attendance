from django.db import models
from users.models import User
from roster.models import Shift

class AttendanceRecord(models.Model):
    staff = models.ForeignKey(User, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='attendance_images/')
    marked_within_shift_time = models.BooleanField(default=False)

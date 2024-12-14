from django.contrib import admin
from .models import Shift, WeeklyOff, UserShiftMapping

admin.site.register(Shift)
admin.site.register(WeeklyOff)
admin.site.register(UserShiftMapping)
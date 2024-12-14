from .views import AttendanceRecordViewSet
from django.urls import path

urlpatterns = [
    path('records/', AttendanceRecordViewSet.as_view(), name='records'),
    ]

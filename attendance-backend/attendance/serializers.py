from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import AttendanceRecord
from roster.models import Shift
from users.serializers import UserSerializer
from roster.serializers import ShiftSerializer
from datetime import datetime, timedelta
import pytz


class AttendanceRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = AttendanceRecord
        fields = [
            "id",
            "staff",
            "shift",
            "timestamp",
            "image",
            "marked_within_shift_time",
        ]
        read_only_fields = ["staff", "timestamp", "marked_within_shift_time"]

    def create(self, validated_data):
        shift = validated_data['shift']
        staff = self.context.get("staff")
        india_timezone = pytz.timezone("Asia/Kolkata")
        now = datetime.now(india_timezone)
        shift_start = datetime.combine(now.date(), shift.start_time, tzinfo=india_timezone)
        shift_end = datetime.combine(now.date(), shift.end_time, tzinfo=india_timezone)
        is_valid_time = (shift_start - timedelta(hours=1)) <= now <= shift_end
        validated_data.update({"staff":staff, "marked_within_shift_time":is_valid_time})
        return super().create(validated_data)

    def to_representation(self, instance):
        # Use nested serializers for representation
        representation = super().to_representation(instance)
        representation["image"] = f"http://127.0.0.1:8000{representation.pop('image')}"
        representation["staff"] = UserSerializer(instance.staff).data
        representation["shift"] = ShiftSerializer(instance.shift).data
        return representation

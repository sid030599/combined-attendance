from rest_framework import serializers
from .models import Shift, WeeklyOff, UserShiftMapping
from users.serializers import UserSerializer


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ["id", "start_time", "end_time"]

class UserShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserShiftMapping
        fields = [
            "id",
            "staff",
            "shift",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["staff"] = UserSerializer(instance.staff).data
        representation['shift'] = ShiftSerializer(instance.shift).data
        return representation


class WeeklyOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyOff
        fields = ['id', 'staff', 'day_of_week',"shift"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['staff'] = UserSerializer(instance.staff).data
        representation['shift'] = ShiftSerializer(instance.shift).data
        return representation

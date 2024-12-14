from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import AttendanceRecord
from rest_framework.response import Response
from attendance.serializers import AttendanceRecordSerializer


class AttendanceRecordViewSet(APIView):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self,user):
        """
        Define this method to ensure we use the correct queryset for the view.
        """
        if user.role == "manager":
            records = AttendanceRecord.objects.all()
        else:
            records = AttendanceRecord.objects.filter(staff__id=user.id)
        return records

    def post(self, request):
        staff = self.request.user
        serializer = self.serializer_class(data=request.data, context={"staff":staff})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get(self, request):
        data = AttendanceRecordSerializer(self.get_queryset(request.user), many=True).data
        return Response(data)
        

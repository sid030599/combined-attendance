from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from .models import User
from django.contrib.auth import logout
from users.permissions import IsManager
from .serializers import UserSerializer, CustomTokenObtainPairSerializer


class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            "user_data": {
                "username": request.user.username,
                "email": request.user.email,
                "role": request.user.role,
            }
        }
        return Response(response)


class StaffListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        users = User.objects.filter(role="staff")
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id=None):
        if not user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            if request.user.role != "manager":
                raise PermissionDenied("You do not have permission to delete staff members.")

            if user.role == "manager" or user == request.user:
                raise PermissionDenied("You cannot delete this user.")

            user.delete()
            return Response({"message": "Staff deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        except User.DoesNotExist:
            raise NotFound("User not found")


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {"message": "Successfully logged out."}, status=status.HTTP_200_OK
        )

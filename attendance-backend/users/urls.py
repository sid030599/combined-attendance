from django.urls import path
from .views import UserListView, CustomTokenObtainPairView, LogoutAPIView, StaffListView
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),    
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('staff/', StaffListView.as_view(), name='staff_list'),
    path('staff/<int:user_id>/', StaffListView.as_view(), name='staff-delete'),
]

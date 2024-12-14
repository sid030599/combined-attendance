from rest_framework.permissions import BasePermission

class IsManager(BasePermission):
    """
    Custom permission to allow only managers to access certain views.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'manager'

class IsStaff(BasePermission):
    """
    Custom permission to allow only staff to access certain views.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'staff'

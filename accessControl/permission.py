from rest_framework.permissions import BasePermission

from userAccount.models import Account  # Assuming your model path


class IsSystemAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'system_admin'


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'doctor'
    """
    def has_object_permission(self, request, view, obj):
        # Optional: Further restrict access to specific user objects for doctors (e.g., only view assigned patients)
        if request.method in ['GET', 'PUT']:  # Allow GET & PUT (view/update) for assigned patients
            return obj == request.user or (request.user.role == 'doctor' and obj.assigned_doctor == request.user)  # Assuming an 'assigned_doctor' field in Patient model
        return False  # Deny other request methods (e.g., DELETE) on other users
    """

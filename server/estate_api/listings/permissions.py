from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    GET herkese açık. Diğer işlemler sadece admin.
    """

    def has_permission(self, request, view):
        # Eğer sadece görüntüleme isteği ise (GET, HEAD, OPTIONS), izin ver
        if request.method in permissions.SAFE_METHODS:
            return True
        # Diğer işlemler için sadece admin izinli
        return request.user and request.user.is_authenticated and request.user.is_staff
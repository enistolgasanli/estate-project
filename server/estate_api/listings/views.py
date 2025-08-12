from django.shortcuts import render
from rest_framework import generics
from listings.models import Property
from listings.serializers import PropertySerializer
from listings.filters import PropertyFilter

class PropertyListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filterset_class = PropertyFilter

class PropertyDetailView(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = "id"

# apps/realestate/views.py
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Listing, ListingImage, Inquiry, City, PropertyCategory, Favorite
from .serializers import (
    ListingListSerializer, ListingDetailSerializer,
    ListingImageSerializer, InquirySerializer, CitySerializer, FavoriteSerializer
)

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # owners or staff
        return getattr(request.user, 'is_staff', False) or obj.owner == request.user

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.filter(is_deleted=False).select_related('city', 'district', 'neighborhood', 'agent', 'owner')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'district', 'category', 'status', 'rooms', 'price']
    search_fields = ['title', 'description', 'address']
    ordering_fields = ['price', 'created_at', 'published_at', 'view_count']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrAdmin]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ListingDetailSerializer if self.action == 'retrieve' else ListingListSerializer
        return ListingDetailSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def increment_view(self, request, pk=None):
        listing = self.get_object()
        listing.view_count = models.F('view_count') + 1
        listing.save(update_fields=['view_count'])
        listing.refresh_from_db()
        return Response({'view_count': listing.view_count})

class ListingImageViewSet(viewsets.ModelViewSet):
    serializer_class = ListingImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = ListingImage.objects.all()

class InquiryViewSet(viewsets.ModelViewSet):
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny]
    queryset = Inquiry.objects.all()

class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

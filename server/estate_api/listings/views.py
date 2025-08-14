from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Listing
from .serializers import ListingListSerializer, ListingDetailSerializer
from django.shortcuts import get_object_or_404
from listings.permissions import IsAdminOrReadOnly
from listings.filters import PropertyFilter

class ListingListCreateView(APIView):
    permission_classes = [IsAdminOrReadOnly]
    filterset_class = PropertyFilter

    def get(self, request):
        queryset = Listing.objects.filter(is_deleted=False)
        filtered_queryset = PropertyFilter(request.GET, queryset=queryset).qs
        serializer = ListingListSerializer(filtered_queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ListingDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListingDetailView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get_object(self, pk):
        return get_object_or_404(Listing, pk=pk, is_deleted=False)

    def get(self, request, pk):
        listing = self.get_object(pk)
        serializer = ListingDetailSerializer(listing)
        return Response(serializer.data)

    def put(self, request, pk):
        listing = self.get_object(pk)
        if listing.owner != request.user and not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        serializer = ListingDetailSerializer(listing, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        listing = self.get_object(pk)
        if listing.owner != request.user and not request.user.is_staff:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        listing.soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IncrementListingView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        listing = get_object_or_404(Listing, pk=pk, is_deleted=False)
        listing.view_count += 1
        listing.save()
        return Response({'view_count': listing.view_count})
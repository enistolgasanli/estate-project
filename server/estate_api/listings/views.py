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
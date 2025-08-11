from django.urls import path
from listings.views import PropertyListView, PropertyDetailView

urlpatterns = [
    path("properties", PropertyListView.as_view(), name="property_list"),
    path("properties/<uuid:id>", PropertyDetailView.as_view(), name="property_detail")
]
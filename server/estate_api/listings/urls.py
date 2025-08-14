# from django.urls import path
# from listings.views import PropertyListView, PropertyDetailView

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ListingListCreateView, ListingDetailView, IncrementListingView

# urlpatterns = [
#     path("properties", PropertyListView.as_view(), name="property_list"),
#     path("properties/<uuid:id>", PropertyDetailView.as_view(), name="property_detail")
# ]



urlpatterns = [
    path('listings', ListingListCreateView.as_view(), name='listing-list'),
    path('listings/<uuid:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    path('listings/<uuid:pk>/increment_view/', IncrementListingView.as_view(), name='listing-increment-view'),

    # path('images/', image_list, name='image-list'),
    # path('images/<uuid:pk>/', image_detail, name='image-detail'),

    # path('inquiries/', inquiry_list, name='inquiry-list'),
    # path('inquiries/<uuid:pk>/', inquiry_detail, name='inquiry-detail'),

    # path('cities/', city_list, name='city-list'),
    # path('cities/<uuid:pk>/', city_detail, name='city-detail'),

    # path('favorites/', favorite_list, name='favorite-list'),
    # path('favorites/<uuid:pk>/', favorite_detail, name='favorite-detail'),
]
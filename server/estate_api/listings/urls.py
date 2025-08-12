from django.urls import path
from listings.views import PropertyListView, PropertyDetailView

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ListingViewSet, ListingImageViewSet, InquiryViewSet, CityViewSet, FavoriteViewSet

# urlpatterns = [
#     path("properties", PropertyListView.as_view(), name="property_list"),
#     path("properties/<uuid:id>", PropertyDetailView.as_view(), name="property_detail")
# ]



router = DefaultRouter()
router.register(r'listings', ListingViewSet, basename='listing')
router.register(r'images', ListingImageViewSet, basename='listingimage')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'cities', CityViewSet, basename='city')
router.register(r'favorites', FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
]

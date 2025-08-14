import django_filters
from listings.models import Listing, City, District

class PropertyFilter(django_filters.FilterSet):
    property_type = django_filters.CharFilter(field_name='category__slug', lookup_expr='exact')
    
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    city_slug = django_filters.CharFilter(field_name='city__slug', lookup_expr='exact')
    district_slug = django_filters.CharFilter(field_name='district__slug', lookup_expr='exact')

    class Meta:
        model = Listing
        fields = {
            'listing_type': ['exact'],
            'rooms': ['exact'],
        }
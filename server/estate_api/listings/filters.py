import django_filters
from listings.models import Property, City, District

class PropertyFilter(django_filters.FilterSet):
    property_type_key = django_filters.CharFilter(field_name='property_type__key', lookup_expr='exact')
    
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    city_slug = django_filters.CharFilter(field_name='city__slug', lookup_expr='exact')
    district_slug = django_filters.CharFilter(field_name='district__slug', lookup_expr='exact')

    class Meta:
        model = Property
        fields = {
            'listing_type': ['exact'],
            'rooms': ['exact'],
        }
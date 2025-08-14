# from rest_framework import serializers
# from listings.models import Property

# class PropertySerializer(serializers.ModelSerializer):
#     city = serializers.StringRelatedField()
#     district = serializers.StringRelatedField()
#     property_type = serializers.StringRelatedField()

#     class Meta:
#         model = Property
#         fields = "__all__"

# apps/realestate/serializers.py
from rest_framework import serializers
from .models import (
    City, District, Neighborhood,
    PropertyCategory, AgentProfile,
    Listing, ListingImage, Inquiry, Favorite
)
from django.contrib.auth import get_user_model

User = get_user_model()

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('id', 'name')

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('id', 'name', 'city')

class NeighborhoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neighborhood
        fields = ('id', 'name', 'district')

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ('id', 'image', 'alt', 'order', 'is_cover')

class ListingListSerializer(serializers.ModelSerializer):
    cover = serializers.SerializerMethodField()
    city = CitySerializer()
    district = DistrictSerializer()

    class Meta:
        model = Listing
        fields = ('id', 'title', 'price', 'currency', 'status', 'city', 'district', 'area_m2', 'rooms', 'cover', 'listing_type')

    def get_cover(self, obj):
        cover = obj.images.filter(is_cover=True).first()
        if cover:
            return cover.image.url
        first = obj.images.first()
        return first.image.url if first else None

class ListingDetailSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    agent = serializers.StringRelatedField()

    class Meta:
        model = Listing
        fields = '__all__'
        read_only_fields = ('view_count', 'favorite_count', 'published_at')

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ('is_read',)

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('id', 'user', 'listing', 'created_at')
        read_only_fields = ('created_at',)
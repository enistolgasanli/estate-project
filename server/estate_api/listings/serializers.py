from rest_framework import serializers
from listings.models import Property

class PropertySerializer(serializers.ModelSerializer):
    city = serializers.StringRelatedField()
    district = serializers.StringRelatedField()
    property_type = serializers.StringRelatedField()

    class Meta:
        model = Property
        fields = "__all__"
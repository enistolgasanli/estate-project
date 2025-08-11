import uuid
from django.db import models
from django.utils.text import slugify

class City(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug: self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self): return self.name

class District(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    city = models.ForeignKey(City, related_name='districts', on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, blank=True)

    class Meta:
        unique_together = ('city', 'name')

    def save(self, *args, **kwargs):
        if not self.slug: self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self): return f"{self.name}"

class PropertyType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    key = models.CharField(max_length=50, unique=True)  # 'daire', 'villa'
    name = models.CharField(max_length=120)             # Display name
    icon = models.CharField(max_length=200, blank=True, help_text="icon name or url")
    order = models.PositiveSmallIntegerField(default=0)

    def __str__(self): return self.name

class Feature(models.Model):
    """
    Dinamik özellikler (Equipped kitchen, Lake view, Pet friendly vb.)
    Admin panelinden yeni özellik eklenebilir.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug: self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self): return self.name

class Amenity(models.Model):
    """
    Bina/kompleks düzeyindeki imkanlar (gym, pool, concierge vb.)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug: self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self): return self.name

class Property(models.Model):
    LISTING_TYPE_CHOICES = [
        ("sale", "Satılık"),
        ("rent", "Kiralık")
    ]

    PROPERTY_TYPE_CHOICES = [
        ('apartment', 'Daire'),
        ('residence', 'Rezidans'),
        ('independent', 'Müstakil Ev'),
        ('villa', 'Villa'),
        ('mansion', 'Köşk'),
    ]

    ROOM_CHOICES = [
        ('1+0', '1+0'),
        ('1+1', '1+1'),
        ('2+0', '2+0'),
        ('2+1', '2+1'),
        ('3+0', '3+0'),
        ('3+1', '3+1'),
        ('4+0', '4+0'),
        ('4+1', '4+1'),
    ]

    HEATING_CHOICES = [
        ('none','Yok'),
        ('central','Merkezi'),
        ('individual','Kombili'),
        ('floor','Yerden Isıtma'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=300, blank=True, db_index=True)
    description = models.TextField()
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES)
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE, related_name="properties")

    price = models.DecimalField(max_digits=14, decimal_places=2)
    
    area_m2 = models.PositiveIntegerField(null=True, blank=True)
    beds = models.PositiveSmallIntegerField()
    baths = models.PositiveSmallIntegerField()
    toilet = models.PositiveSmallIntegerField()
    balcony = models.PositiveSmallIntegerField()
    rooms = models.CharField(max_length=10, blank=True, help_text='ör. 3+1')
    floor = models.IntegerField(null=True, blank=True)

    heating = models.CharField(max_length=30, choices=HEATING_CHOICES, blank=True)
    air_conditioning = models.BooleanField(default=False)
    furnished = models.BooleanField(default=False)

    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="city")
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, related_name='properties')
    neighborhood = models.CharField(max_length=200, blank=True)
    full_address = models.TextField(blank=True)

    features = models.ManyToManyField(Feature, blank=True, related_name='properties')
    amenities = models.ManyToManyField(Amenity, blank=True, related_name='properties')

    views_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['price']),
            models.Index(fields=['listing_type']),
            models.Index(fields=['-created_at']),
            models.Index(fields=['city', 'district']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.id}")[:300]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.city or ''}"
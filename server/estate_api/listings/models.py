import uuid
from django.db import models
from django.utils import timezone
from users.models import CustomUser

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True



class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    class Meta:
        abstract = True

class City(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class District(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="districts")
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("city", "name")

    def __str__(self):
        return f"{self.name}, {self.city.name}"
    
class Neighborhood(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name="neighborhoods")
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ("district", "name")

    def __str__(self):
        return f"{self.name}, {self.district.name}"
    
class PropertyCategory(models.Model):
    # e.g., Daire, Villa, Arsa, Isyeri
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(max_length=64, unique=True)
    title = models.CharField(max_length=64)

    def __str__(self):
        return self.title
    
class AgentProfile(TimeStampedModel):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='agent_profile')
    phone = models.CharField(max_length=32, blank=True, null=True)
    company = models.CharField(max_length=128, blank=True)
    is_verified = models.BooleanField(default=False, db_index=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user} - Agent"
    
class Listing(TimeStampedModel, SoftDeleteModel):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending', 'Pending Approval'),
        ('active', 'Active'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
        ('archived', 'Archived'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='listings')
    agent = models.ForeignKey(AgentProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='listings')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(PropertyCategory, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, db_index=True)
    currency = models.CharField(max_length=8, default='TRY')
    is_negotiable = models.BooleanField(default=False)
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default='draft', db_index=True)

    # location
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)
    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True)
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.CharField(max_length=512, blank=True)

    # property specifics
    area_m2 = models.PositiveIntegerField(null=True, blank=True, db_index=True)
    rooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    floor = models.CharField(max_length=32, blank=True)  # e.g., 3/5

    has_elevator = models.BooleanField(default=False)
    has_parking = models.BooleanField(default=False)
    has_balcony = models.BooleanField(default=False)
    heating_type = models.CharField(max_length=64, blank=True)  # central, kombi, vs.

    # analytics
    view_count = models.PositiveIntegerField(default=0, db_index=True)
    published_at = models.DateTimeField(null=True, blank=True, db_index=True)

    class Meta:
        indexes = [
            models.Index(fields=['status', 'price']),
            models.Index(fields=['city', 'district']),
        ]

    def publish(self):
        self.status = 'active'
        self.published_at = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.title} ({self.status})"
    
# --- Listing media
def listing_image_upload_to(instance, filename):
    return f"listings/{instance.listing.id}/{uuid.uuid4().hex}_{filename}"

class ListingImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=listing_image_upload_to)
    alt = models.CharField(max_length=255, blank=True)
    order = models.PositiveSmallIntegerField(default=0, db_index=True)
    is_cover = models.BooleanField(default=False)

    class Meta:
        ordering = ('order',)

# --- Messages / Inquiries
class Inquiry(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='inquiries')
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='sent_inquiries')
    name = models.CharField(max_length=128)  # allow anonymous inquiries
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False, db_index=True)
    responded = models.BooleanField(default=False)

# --- Favorites (user bookmarks)
class Favorite(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='favorites')
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='favorited_by')

    class Meta:
        unique_together = ('user', 'listing')

# --- Payments / Transactions (if you have paid listings)
class Transaction(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=8, default='TRY')
    provider = models.CharField(max_length=64)  # e.g., stripe, iyzico
    provider_reference = models.CharField(max_length=256, blank=True)
    success = models.BooleanField(default=False)
    metadata = models.JSONField(null=True, blank=True)

# class City(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=100, unique=True)
#     slug = models.SlugField(max_length=140, unique=True, blank=True)

#     def save(self, *args, **kwargs):
#         if not self.slug: self.slug = slugify(self.name)
#         super().save(*args, **kwargs)

#     def __str__(self): return self.name

# class District(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     city = models.ForeignKey(City, related_name='districts', on_delete=models.CASCADE)
#     name = models.CharField(max_length=120)
#     slug = models.SlugField(max_length=140, blank=True)

#     class Meta:
#         unique_together = ('city', 'name')

#     def save(self, *args, **kwargs):
#         if not self.slug: self.slug = slugify(self.name)
#         super().save(*args, **kwargs)

#     def __str__(self): return f"{self.name}"

# class PropertyType(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     key = models.CharField(max_length=50, unique=True)  # 'daire', 'villa'
#     name = models.CharField(max_length=120)             # Display name
#     icon = models.CharField(max_length=200, blank=True, help_text="icon name or url")
#     order = models.PositiveSmallIntegerField(default=0)

#     def __str__(self): return self.name

# class Feature(models.Model):
#     """
#     Dinamik özellikler (Equipped kitchen, Lake view, Pet friendly vb.)
#     Admin panelinden yeni özellik eklenebilir.
#     """
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=120, unique=True)
#     slug = models.SlugField(max_length=140, unique=True, blank=True)

#     def save(self, *args, **kwargs):
#         if not self.slug: self.slug = slugify(self.name)
#         super().save(*args, **kwargs)

#     def __str__(self): return self.name

# class Amenity(models.Model):
#     """
#     Bina/kompleks düzeyindeki imkanlar (gym, pool, concierge vb.)
#     """
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=120, unique=True)
#     slug = models.SlugField(max_length=140, unique=True, blank=True)

#     def save(self, *args, **kwargs):
#         if not self.slug: self.slug = slugify(self.name)
#         super().save(*args, **kwargs)

#     def __str__(self): return self.name

# class Property(models.Model):
#     LISTING_TYPE_CHOICES = [
#         ("sale", "Satılık"),
#         ("rent", "Kiralık")
#     ]

#     PROPERTY_TYPE_CHOICES = [
#         ('apartment', 'Daire'),
#         ('residence', 'Rezidans'),
#         ('independent', 'Müstakil Ev'),
#         ('villa', 'Villa'),
#         ('mansion', 'Köşk'),
#     ]

#     ROOM_CHOICES = [
#         ('1+0', '1+0'),
#         ('1+1', '1+1'),
#         ('2+0', '2+0'),
#         ('2+1', '2+1'),
#         ('3+0', '3+0'),
#         ('3+1', '3+1'),
#         ('4+0', '4+0'),
#         ('4+1', '4+1'),
#     ]

#     HEATING_CHOICES = [
#         ('none','Yok'),
#         ('central','Merkezi'),
#         ('individual','Kombili'),
#         ('floor','Yerden Isıtma'),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     title = models.CharField(max_length=255)
#     slug = models.SlugField(max_length=300, blank=True, db_index=True)
#     description = models.TextField()
#     listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES)
#     property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE, related_name="properties")

#     price = models.DecimalField(max_digits=14, decimal_places=2)
    
#     area_m2 = models.PositiveIntegerField(null=True, blank=True)
#     beds = models.PositiveSmallIntegerField()
#     baths = models.PositiveSmallIntegerField()
#     toilet = models.PositiveSmallIntegerField()
#     balcony = models.PositiveSmallIntegerField()
#     rooms = models.CharField(max_length=10, blank=True, help_text='ör. 3+1')
#     floor = models.IntegerField(null=True, blank=True)

#     heating = models.CharField(max_length=30, choices=HEATING_CHOICES, blank=True)
#     air_conditioning = models.BooleanField(default=False)
#     furnished = models.BooleanField(default=False)

#     city = models.ForeignKey(City, on_delete=models.CASCADE, related_name="city")
#     district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, related_name='properties')
#     neighborhood = models.CharField(max_length=200, blank=True)
#     full_address = models.TextField(blank=True)

#     features = models.ManyToManyField(Feature, blank=True, related_name='properties')
#     amenities = models.ManyToManyField(Amenity, blank=True, related_name='properties')

#     views_count = models.PositiveIntegerField(default=0)
#     created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
#     class Meta:
#         indexes = [
#             models.Index(fields=['price']),
#             models.Index(fields=['listing_type']),
#             models.Index(fields=['-created_at']),
#             models.Index(fields=['city', 'district']),
#         ]

#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(f"{self.title}-{self.id}")[:300]
#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.title} - {self.city or ''}"
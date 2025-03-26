from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Admin')
        ASTROLOGER = 'ASTROLOGER', _('Astrologer')
        CUSTOMER = 'CUSTOMER', _('Customer')
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.CUSTOMER)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    
    # Additional fields for customers
    birth_date = models.DateField(null=True, blank=True)
    birth_time = models.TimeField(null=True, blank=True)
    birth_place = models.CharField(max_length=100, null=True, blank=True)
    
    # Fields for tracking
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username
    
    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN
    
    @property
    def is_astrologer(self):
        return self.role == self.Role.ASTROLOGER
    
    @property
    def is_customer(self):
        return self.role == self.Role.CUSTOMER


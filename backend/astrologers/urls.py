from django.urls import path
from .views import (
    AstrologerListView, AstrologerDetailView, 
    AdminAstrologerView, AdminAstrologerDetailView,
    SpecializationView, AdminSpecializationView,
    AstrologerAvailabilityView, ReviewView
)

urlpatterns = [
    # Public endpoints
    path('', AstrologerListView.as_view(), name='astrologer-list'),
    path('<int:pk>/', AstrologerDetailView.as_view(), name='astrologer-detail'),
    path('specializations/', SpecializationView.as_view(), name='specialization-list'),
    
    # Admin endpoints
    path('admin/', AdminAstrologerView.as_view(), name='admin-astrologer-list'),
    path('admin/<int:pk>/', AdminAstrologerDetailView.as_view(), name='admin-astrologer-detail'),
    path('admin/specializations/', AdminSpecializationView.as_view(), name='admin-specialization-create'),
    path('admin/specializations/<int:pk>/', AdminSpecializationView.as_view(), name='admin-specialization-detail'),
    
    # Astrologer endpoints
    path('availability/', AstrologerAvailabilityView.as_view(), name='astrologer-availability'),
    path('availability/<int:pk>/', AstrologerAvailabilityView.as_view(), name='astrologer-availability-detail'),
    
    # Customer endpoints
    path('<int:astrologer_id>/reviews/', ReviewView.as_view(), name='astrologer-review'),
]


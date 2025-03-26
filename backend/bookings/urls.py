from django.urls import path
from .views import (
    CustomerBookingView, CustomerBookingDetailView,
    AstrologerBookingView, AstrologerBookingDetailView,
    AdminBookingView, AdminBookingDetailView,
    PaymentView, AdminPaymentView,
    ConversationView, MessageView
)

urlpatterns = [
    # Customer endpoints
    path('customer/', CustomerBookingView.as_view(), name='customer-booking-list'),
    path('customer/<int:pk>/', CustomerBookingDetailView.as_view(), name='customer-booking-detail'),
    path('customer/<int:booking_id>/payment/', PaymentView.as_view(), name='customer-payment'),
    
    # Astrologer endpoints
    path('astrologer/', AstrologerBookingView.as_view(), name='astrologer-booking-list'),
    path('astrologer/<int:pk>/', AstrologerBookingDetailView.as_view(), name='astrologer-booking-detail'),
    
    # Admin endpoints
    path('admin/', AdminBookingView.as_view(), name='admin-booking-list'),
    path('admin/<int:pk>/', AdminBookingDetailView.as_view(), name='admin-booking-detail'),
    path('admin/payments/', AdminPaymentView.as_view(), name='admin-payment-list'),
    path('admin/payments/<int:pk>/', AdminPaymentView.as_view(), name='admin-payment-detail'),
    
    # Conversation endpoints
    path('conversation/<int:booking_id>/', ConversationView.as_view(), name='conversation-detail'),
    path('conversation/<int:conversation_id>/messages/', MessageView.as_view(), name='message-create'),
]


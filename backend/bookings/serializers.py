from rest_framework import serializers
from .models import Booking, Payment, Conversation, Message
from users.serializers import UserSerializer
from astrologers.serializers import AstrologerProfileSerializer

class BookingSerializer(serializers.ModelSerializer):
    customer_details = UserSerializer(source='customer', read_only=True)
    astrologer_details = AstrologerProfileSerializer(source='astrologer', read_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'customer', 'customer_details', 'astrologer', 'astrologer_details',
                  'booking_date', 'start_time', 'end_time', 'status', 'consultation_type',
                  'notes', 'amount', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        # Check if the astrologer is available at the requested time
        # This is a simplified validation - in a real app, you'd check against availability
        if data.get('start_time') >= data.get('end_time'):
            raise serializers.ValidationError("End time must be after start time")
        return data



class PaymentSerializer(serializers.ModelSerializer):
    booking_details = BookingSerializer(source='booking', read_only=True)
    
    class Meta:
        model = Payment
        fields = ['id', 'booking', 'booking_details', 'amount', 'transaction_id',
                  'payment_method', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'booking']

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'sender_name', 'content', 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    booking_details = BookingSerializer(source='booking', read_only=True)
    
    class Meta:
        model = Conversation
        fields = ['id', 'booking', 'booking_details', 'messages', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


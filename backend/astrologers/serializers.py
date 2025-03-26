from rest_framework import serializers
from .models import AstrologerProfile, Specialization, AstrologerAvailability, Review
from users.serializers import UserSerializer

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ['id', 'name', 'description']

class AstrologerAvailabilitySerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(source='get_day_of_week_display', read_only=True)
    
    class Meta:
        model = AstrologerAvailability
        fields = ['id', 'day_of_week', 'day_name', 'start_time', 'end_time']

class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'customer', 'customer_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['customer']
    
    def create(self, validated_data):
        validated_data['customer'] = self.context['request'].user
        return super().create(validated_data)

class AstrologerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    specializations = SpecializationSerializer(many=True, read_only=True)
    specialization_ids = serializers.PrimaryKeyRelatedField(
        queryset=Specialization.objects.all(),
        write_only=True,
        many=True,
        required=False
    )
    availabilities = AstrologerAvailabilitySerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = AstrologerProfile
        fields = ['id', 'user', 'bio', 'experience_years', 'hourly_rate', 
                  'specializations', 'specialization_ids', 'languages', 
                  'is_available', 'rating', 'total_consultations', 
                  'expertise_areas', 'availabilities', 'reviews', 
                  'created_at', 'updated_at']
    
    def create(self, validated_data):
        specialization_ids = validated_data.pop('specialization_ids', [])
        astrologer_profile = AstrologerProfile.objects.create(**validated_data)
        astrologer_profile.specializations.set(specialization_ids)
        return astrologer_profile
    
    def update(self, instance, validated_data):
        specialization_ids = validated_data.pop('specialization_ids', None)
        if specialization_ids is not None:
            instance.specializations.set(specialization_ids)
        return super().update(instance, validated_data)


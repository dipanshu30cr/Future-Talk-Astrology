from django.db import models
from users.models import User

class Specialization(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name

class AstrologerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='astrologer_profile')
    bio = models.TextField()
    experience_years = models.PositiveIntegerField(default=0)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    specializations = models.ManyToManyField(Specialization, related_name='astrologers')
    languages = models.CharField(max_length=200)  # Comma-separated list of languages
    is_available = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_consultations = models.PositiveIntegerField(default=0)
    
    # Additional fields for Hindu astrology
    expertise_areas = models.TextField(help_text="Areas of expertise like Vedic, Nadi, etc.")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"

class AstrologerAvailability(models.Model):
    astrologer = models.ForeignKey(AstrologerProfile, on_delete=models.CASCADE, related_name='availabilities')
    day_of_week = models.IntegerField(choices=[(i, day) for i, day in enumerate(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])])
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    class Meta:
        unique_together = ('astrologer', 'day_of_week', 'start_time', 'end_time')
    
    def __str__(self):
        return f"{self.astrologer.user.username} - {self.get_day_of_week_display()} ({self.start_time} - {self.end_time})"

class Review(models.Model):
    astrologer = models.ForeignKey(AstrologerProfile, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_given')
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('astrologer', 'customer')
    
    def __str__(self):
        return f"Review for {self.astrologer.user.username} by {self.customer.username}"


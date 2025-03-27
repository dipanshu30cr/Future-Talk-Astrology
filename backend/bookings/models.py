from django.db import models
from users.models import User
from astrologers.models import AstrologerProfile

class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        COMPLETED = 'COMPLETED', 'Completed'
        CANCELLED = 'CANCELLED', 'Cancelled'
    
    class MeetingType(models.TextChoices):
        ONLINE = 'ONLINE', 'Online Meeting'
        PHYSICAL = 'PHYSICAL', 'Physical Meeting'
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    astrologer = models.ForeignKey(AstrologerProfile, on_delete=models.CASCADE, related_name='bookings')
    booking_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    consultation_type = models.CharField(max_length=50, choices=[
        ('VEDIC', 'Vedic Astrology'),
        ('NADI', 'Nadi Astrology'),
        ('NUMEROLOGY', 'Numerology'),
        ('TAROT', 'Tarot Reading'),
        ('PALMISTRY', 'Palmistry'),
    ])
    meeting_type = models.CharField(max_length=10, choices=MeetingType.choices, default=MeetingType.ONLINE)
    notes = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Booking {self.id}: {self.customer.username} with {self.astrologer.user.username}"

class Payment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'
        REFUNDED = 'REFUNDED', 'Refunded'
    
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Payment for Booking {self.booking.id}"

class Conversation(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='conversation')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Conversation for Booking {self.booking.id}"

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.sender.username} in Conversation {self.conversation.id}"





# from django.db import models
# from users.models import User
# from astrologers.models import AstrologerProfile

# class Booking(models.Model):
#     class Status(models.TextChoices):
#         PENDING = 'PENDING', 'Pending'
#         CONFIRMED = 'CONFIRMED', 'Confirmed'
#         COMPLETED = 'COMPLETED', 'Completed'
#         CANCELLED = 'CANCELLED', 'Cancelled'
    
#     customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
#     astrologer = models.ForeignKey(AstrologerProfile, on_delete=models.CASCADE, related_name='bookings')
#     booking_date = models.DateField()
#     start_time = models.TimeField()
#     end_time = models.TimeField()
#     status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
#     consultation_type = models.CharField(max_length=50, choices=[
#         ('VEDIC', 'Vedic Astrology'),
#         ('NADI', 'Nadi Astrology'),
#         ('NUMEROLOGY', 'Numerology'),
#         ('TAROT', 'Tarot Reading'),
#         ('PALMISTRY', 'Palmistry'),
#     ])
#     notes = models.TextField(blank=True, null=True)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
    
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return f"Booking {self.id}: {self.customer.username} with {self.astrologer.user.username}"

# class Payment(models.Model):
#     class Status(models.TextChoices):
#         PENDING = 'PENDING', 'Pending'
#         COMPLETED = 'COMPLETED', 'Completed'
#         FAILED = 'FAILED', 'Failed'
#         REFUNDED = 'REFUNDED', 'Refunded'
    
#     booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     transaction_id = models.CharField(max_length=100, blank=True, null=True)
#     payment_method = models.CharField(max_length=50)
#     status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return f"Payment for Booking {self.booking.id}"

# class Conversation(models.Model):
#     booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='conversation')
    
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return f"Conversation for Booking {self.booking.id}"

# class Message(models.Model):
#     conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
#     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
#     content = models.TextField()
#     is_read = models.BooleanField(default=False)
    
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"Message from {self.sender.username} in Conversation {self.conversation.id}"


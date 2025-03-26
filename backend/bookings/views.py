from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from users.permissions import IsAdmin, IsAstrologer, IsCustomer
from .models import Booking, Payment, Conversation, Message
from .serializers import BookingSerializer, PaymentSerializer, ConversationSerializer, MessageSerializer
from astrologers.models import AstrologerProfile

# class CustomerBookingView(APIView):
#     permission_classes = [IsCustomer]
    
#     def get(self, request):
#         print("requested user: ",request.user)
#         print("requested user id: ",request.user.id)
#         bookings = Booking.objects.filter(customer=request.user)
#         serializer = BookingSerializer(bookings, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         serializer = BookingSerializer(data=request.data)
#         if serializer.is_valid():
#             # Set customer to current user
#             serializer.save(customer=request.user.id)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print("Serializer validation errors:", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerBookingView(APIView):
    permission_classes = [IsCustomer]
    
    def get(self, request):
        bookings = Booking.objects.filter(customer=request.user)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Add customer to the data manually if not already in request.data
        booking_data = request.data.copy()
        booking_data['customer'] = request.user.id  # Add customer ID from authenticated user
        
        # Now pass the updated data to the serializer
        serializer = BookingSerializer(data=booking_data)
        
        if serializer.is_valid():
            # Set the customer to the current user in case it's not passed explicitly
            serializer.save(customer=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Serializer validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class CustomerBookingDetailView(APIView):
    permission_classes = [IsCustomer]
    
    def get(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk, customer=request.user)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk, customer=request.user)
        # Only allow cancellation
        if request.data.get('status') == Booking.Status.CANCELLED:
            booking.status = Booking.Status.CANCELLED
            booking.save()
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        return Response({"error": "Only cancellation is allowed"}, status=status.HTTP_400_BAD_REQUEST)

class AstrologerBookingView(APIView):
    permission_classes = [IsAstrologer]
    
    def get(self, request):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        bookings = Booking.objects.filter(astrologer=astrologer)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class AstrologerBookingDetailView(APIView):
    permission_classes = [IsAstrologer]
    
    def get(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        booking = get_object_or_404(Booking, pk=pk, astrologer=astrologer)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        booking = get_object_or_404(Booking, pk=pk, astrologer=astrologer)
        
        # Astrologers can only update status to CONFIRMED or COMPLETED
        new_status = request.data.get('status')
        if new_status in [Booking.Status.CONFIRMED, Booking.Status.COMPLETED]:
            booking.status = new_status
            booking.save()
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        return Response({"error": "Invalid status update"}, status=status.HTTP_400_BAD_REQUEST)

class AdminBookingView(APIView):
    permission_classes = [IsAdmin]
    
    def get(self, request):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

class AdminBookingDetailView(APIView):
    permission_classes = [IsAdmin]
    
    def get(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        serializer = BookingSerializer(booking)
        return Response(serializer.data)
    
    def put(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        serializer = BookingSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class PaymentView(APIView):
#     permission_classes = [IsCustomer]
#     print("inside view")
    
#     def post(self, request, booking_id):
#         booking = get_object_or_404(Booking, pk=booking_id, customer=request.user)
        
#         # Check if payment already exists
#         if hasattr(booking, 'payment'):
#             return Response({"error": "Payment already exists"}, status=status.HTTP_400_BAD_REQUEST)
        

#         print("Raw request data:", request.data)  # Debugging request payload
#         # Create payment
#         serializer = PaymentSerializer(data=request.data)
#         if serializer.is_valid():
            
#             serializer.save(booking=booking)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print("serializer_data",serializer.data)
#         print("Validation Errors:", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentView(APIView):
    permission_classes = [IsCustomer]

    def post(self, request, booking_id):
        booking = get_object_or_404(Booking, pk=booking_id, customer=request.user)
        
        # Check if payment already exists
        if hasattr(booking, 'payment'):
            return Response({"error": "Payment already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        print("Raw request data:", request.data)  # Debugging request payload
        
        # Create payment
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(booking=booking)  # Pass booking explicitly
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("serializer_data", serializer.data)
        print("Validation Errors:", serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminPaymentView(APIView):
    
    def get(self, request):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        payment = get_object_or_404(Payment, pk=pk)
        serializer = PaymentSerializer(payment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConversationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, booking_id):
        booking = get_object_or_404(Booking, pk=booking_id)
        
        # Check if user is authorized to view this conversation
        if not (request.user == booking.customer or 
                request.user == booking.astrologer.user or 
                request.user.is_admin):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        # Get or create conversation
        conversation, created = Conversation.objects.get_or_create(booking=booking)
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)

class MessageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, pk=conversation_id)
        booking = conversation.booking
        
        # Check if user is authorized to send messages in this conversation
        if not (request.user == booking.customer or request.user == booking.astrologer.user):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(conversation=conversation, sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


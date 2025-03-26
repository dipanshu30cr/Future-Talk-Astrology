from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from users.models import User
from users.permissions import IsAdmin, IsAstrologer, IsCustomer
from .models import AstrologerProfile, Specialization, AstrologerAvailability, Review
from .serializers import (
    AstrologerProfileSerializer, SpecializationSerializer,
    AstrologerAvailabilitySerializer, ReviewSerializer
)

class AstrologerListView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        astrologers = AstrologerProfile.objects.filter(is_available=True)
        serializer = AstrologerProfileSerializer(astrologers, many=True)
        return Response(serializer.data)

class AstrologerDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, pk=pk)
        serializer = AstrologerProfileSerializer(astrologer)
        return Response(serializer.data)

class AdminAstrologerView(APIView):
    permission_classes = [IsAdmin]
    
    def get(self, request):
        astrologers = AstrologerProfile.objects.all()
        serializer = AstrologerProfileSerializer(astrologers, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Create a new astrologer profile
        user_id = request.data.get('user_id')
        user = get_object_or_404(User, id=user_id)
        
        # Check if user is already an astrologer
        if hasattr(user, 'astrologer_profile'):
            return Response({'error': 'User already has an astrologer profile'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        # Update user role to ASTROLOGER
        user.role = User.Role.ASTROLOGER
        user.save()
        
        # Create astrologer profile
        serializer = AstrologerProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminAstrologerDetailView(APIView):
    permission_classes = [IsAdmin]
    
    def get(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, pk=pk)
        serializer = AstrologerProfileSerializer(astrologer)
        return Response(serializer.data)
    
    def put(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, pk=pk)
        serializer = AstrologerProfileSerializer(astrologer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, pk=pk)
        user = astrologer.user
        user.role = User.Role.CUSTOMER  # Downgrade to customer
        user.save()
        astrologer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SpecializationView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        specializations = Specialization.objects.all()
        serializer = SpecializationSerializer(specializations, many=True)
        return Response(serializer.data)

class AdminSpecializationView(APIView):
    permission_classes = [IsAdmin]
    
    def post(self, request):
        serializer = SpecializationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        specialization = get_object_or_404(Specialization, pk=pk)
        serializer = SpecializationSerializer(specialization, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        specialization = get_object_or_404(Specialization, pk=pk)
        specialization.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AstrologerAvailabilityView(APIView):
    permission_classes = [IsAstrologer]
    
    def get(self, request):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        availabilities = astrologer.availabilities.all()
        serializer = AstrologerAvailabilitySerializer(availabilities, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        serializer = AstrologerAvailabilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(astrologer=astrologer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        astrologer = get_object_or_404(AstrologerProfile, user=request.user)
        availability = get_object_or_404(AstrologerAvailability, pk=pk, astrologer=astrologer)
        availability.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReviewView(APIView):
    permission_classes = [IsCustomer]
    
    def post(self, request, astrologer_id):
        astrologer = get_object_or_404(AstrologerProfile, pk=astrologer_id)
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(astrologer=astrologer)
            
            # Update astrologer rating
            reviews = Review.objects.filter(astrologer=astrologer)
            total_rating = sum(review.rating for review in reviews)
            astrologer.rating = total_rating / reviews.count()
            astrologer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


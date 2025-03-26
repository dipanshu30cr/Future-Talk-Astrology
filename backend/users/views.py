from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer, LoginSerializer
from .permissions import IsAdmin, IsAdminOrSelf
from django.db import IntegrityError


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class RegisterView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         print("Received request data:", request.data)
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             try:
#                 user = serializer.save()
#                 refresh = RefreshToken.for_user(user)
#                 return Response({
#                     'refresh': str(refresh),
#                     'access': str(refresh.access_token),
#                     'user': UserSerializer(user).data
#                 }, status=status.HTTP_201_CREATED)
#             except IntegrityError as e:
#                 # If the error is due to a unique constraint violation, return a custom error
#                 return Response({'error': 'Username or email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
#         print("Serializer validation errors:", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
            if not user.check_password(password):
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAdminOrSelf]
    
    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            self.check_object_permissions(request, user)
            serializer = UserSerializer(user)
            print("data to send: ",serializer.data)
            return Response(serializer.data)
            
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            self.check_object_permissions(request, user)
            serializer = UserUpdateSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            print("data to send: ",serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            self.check_object_permissions(request, user)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)




class UserListView(APIView):
    permission_classes = [IsAdmin]
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        print("serializer: ",serializer)
        return Response(serializer.data)


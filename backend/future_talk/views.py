# Create a new file views.py in the future_talk directory
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings

class ContactFormView(APIView):
    print("inside view")
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("data coming")
        name = request.data.get('name')
        print("name: ",name)
        email = request.data.get('email')
        print("email: ",email)
        subject = request.data.get('subject')
        print("subject: ",subject)
        message = request.data.get('message')
        print("message: ",message)
        
        if not all([name, email, subject, message]):
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Compose email
        email_subject = f"FutureTalk Contact Form: {subject}"
        email_message = f"""
        You have received a new message from the FutureTalk contact form:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        """
        
        # Send email
        try:
            send_mail(
                email_subject,
                email_message,
                settings.DEFAULT_FROM_EMAIL,
                ['mdrax28@gmail.com'],  # Your email address
                fail_silently=False,
            )
            return Response(
                {"success": "Your message has been sent successfully!"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


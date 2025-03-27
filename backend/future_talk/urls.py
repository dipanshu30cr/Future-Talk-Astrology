from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import ContactFormView  # Import the new view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/astrologers/', include('astrologers.urls')),
    path('api/bookings/', include('bookings.urls')),
    path('api/contact/', ContactFormView.as_view(), name='contact-form'),  # Add this line
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




# from django.contrib import admin
# from django.urls import path, include
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/users/', include('users.urls')),
#     path('api/astrologers/', include('astrologers.urls')),
#     path('api/bookings/', include('bookings.urls')),
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


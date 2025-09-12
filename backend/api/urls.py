from django.urls import path
from .views import me, sponsor_home, advertiser_home
from .views_registration import register_sponsor, register_advertiser

urlpatterns = [
    path("me", me),
    path("sponsor/home", sponsor_home),
    path("advertiser/home", advertiser_home),
    path("register/sponsor", register_sponsor),
    path("register/advertiser", register_advertiser),
]
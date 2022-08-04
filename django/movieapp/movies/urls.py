from importlib.resources import path
from django.urls import URLPattern


from django.urls import path
from . import views


urlpatterns=[ 
    path("",views.home),
    path("home",views.home),
    path("movies",views.movies),


]
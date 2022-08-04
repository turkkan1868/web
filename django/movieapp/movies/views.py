from django.shortcuts import render

# Create your views here.
kategori_liste = ["macera","romantik","dram"]
film_liste = ["macera1","romantik1","dram1"]


def home(request):
    data = {
        "kategori" : kategori_liste,
        "film": film_liste
    }
    return render(request,"index.html",data)


def movies(request):
    return render(request,"movies.html")
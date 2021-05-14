from django.shortcuts import render

# Create your views here.
def hobby(request):
    return render(request, 'hobby.html')
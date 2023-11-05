from django.urls import path
from . import views

urlpatterns = [
    path('folders/', views.Folders.as_view()),
    path('notes/fid/<str:pk>/', views.FolderDetails.as_view()),
    path('notes/fid/<str:folder_id>/nid/<str:note_id>/', views.NoteDetails.as_view()),
]
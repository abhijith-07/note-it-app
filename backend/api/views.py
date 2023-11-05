from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .models import Note, Folder
from .serializers import NoteSerializer, FolderSerializer

'''
    Get folders, add folders
'''
class Folders(APIView):

    def get(self, request, format=None):
        folders = Folder.objects.all()
        serializer = FolderSerializer(folders, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = FolderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

'''
    Get details of notes in a folder
    Add new note to a folder
    update folder details, delete the folder
'''
class FolderDetails(APIView):
    
    def get_object(self, pk):
        try:
            folder = Folder.objects.get(id=pk)
            return folder
        except Folder.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        folder = self.get_object(pk)
        note = Note.objects.filter(folder=folder)
        serializer = NoteSerializer(note, many=True)
        return Response(serializer.data)
        
    def post(self, request, pk, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, pk, format=None):
        folder = self.get_object(pk)
        serialzer = FolderSerializer(folder, data=request.data)
        if serialzer.is_valid():
            serialzer.save()
            return Response(serialzer.data)
        return Response(serialzer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        folder = self.get_object(pk)
        folder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
'''
    Get, Update, Delete details of a note
'''
class NoteDetails(APIView):

    def get_object(self, folder_id, note_id):
        try:
            folder = Folder.objects.get(id=folder_id)
            note = Note.objects.get(id=note_id, folder=folder)
            return note
        except Note.DoesNotExist:
            raise Http404
    
    def get(self, request, folder_id, note_id, format=None):
        note = self.get_object(folder_id=folder_id, note_id=note_id)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    
    def put(self, request, folder_id, note_id, format=None):
        note = self.get_object(folder_id=folder_id, note_id=note_id)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, folder_id, note_id, format=None):
        note = self.get_object(folder_id=folder_id, note_id=note_id)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

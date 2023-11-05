from rest_framework import serializers
from .models import Note, Folder
    
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    updated_time = serializers.TimeField(format="%H:%M", read_only=True)
    class Meta:
        model = Note
        fields = '__all__'

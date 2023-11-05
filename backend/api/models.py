from django.db import models
import note_it.settings as settings

class Folder(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    
class Note(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    content = models.TextField(default='')
    updated_date = models.DateField(auto_now=True)
    updated_time = models.TimeField(auto_now=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.title} - {self.updated_time.strftime('%I:%M %p')}"

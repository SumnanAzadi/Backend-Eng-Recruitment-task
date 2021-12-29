from django.db import models
from rest_framework.validators import UniqueValidator
import random, os

def get_filename_ext(filepath):
    # get the full file
    base_name = os.path.basename(filepath)
    # split the file into name and file extension(extension return .jpg ....)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3910209312)
    name, ext = get_filename_ext(filename)
    # change the actual file name to random number with the file extension
    final_filename = '{new_filename}{ext}'.format( new_filename=new_filename, ext=ext)
    return "products/{final_filename}".format(
        new_filename=new_filename,
        final_filename=final_filename
    )


class Todo(models.Model):
    brand_name = models.TextField(max_length=120)
    model_name = models.TextField(max_length=120)
    color = models.TextField(max_length=120)
    jan_code = models.TextField(max_length=120, unique = True, error_messages={'unique':"Another model already exist with this JAN code."})
    image = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    def __str__(self):
        return self.jan_code
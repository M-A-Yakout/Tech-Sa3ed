from django.db import models
from django.contrib.auth.models import User
import uuid
import qrcode
from PIL import Image
from io import BytesIO
from django.core.files import File

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Ticket(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    purchased_at = models.DateTimeField(auto_now_add=True)
    checked_in = models.BooleanField(default=False)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)

    def __str__(self):
        return f"{self.event.title} - {self.user.username}"

    def save(self, *args, **kwargs):
        if not self.qr_code:
            self.generate_qr_code()
        super().save(*args, **kwargs)

    def generate_qr_code(self):
        qr_data = f"ticket:{self.uuid}"
        qr_img = qrcode.make(qr_data)
        blob = BytesIO()
        qr_img.save(blob, format='PNG')
        file_name = f"qr_code_{self.uuid}.png"
        self.qr_code.save(file_name, File(blob), save=False)
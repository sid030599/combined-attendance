# Generated by Django 5.1.4 on 2024-12-10 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AttendanceRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('image', models.ImageField(upload_to='attendance_images/')),
                ('marked_within_shift_time', models.BooleanField(default=False)),
            ],
        ),
    ]

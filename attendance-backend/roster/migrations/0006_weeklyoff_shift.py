# Generated by Django 5.1.4 on 2024-12-10 14:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roster', '0005_usershiftmapping_day_of_week'),
    ]

    operations = [
        migrations.AddField(
            model_name='weeklyoff',
            name='shift',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='roster.shift'),
        ),
    ]

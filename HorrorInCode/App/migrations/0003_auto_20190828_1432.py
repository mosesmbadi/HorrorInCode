# Generated by Django 2.1.1 on 2019-08-28 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0002_auto_20190828_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='user_secret',
            field=models.TextField(default='cRFHD-XS3TMAxW8LNkvBdWhkM4QZtgtOv6eF_TqiGFk'),
        ),
    ]
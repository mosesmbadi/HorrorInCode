# Generated by Django 2.1.1 on 2019-08-29 16:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0003_auto_20190828_1432'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user_secret',
        ),
    ]
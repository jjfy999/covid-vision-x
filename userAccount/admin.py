from django.contrib import admin

from .models import Doctor, Patient, SystemAdmin


# Register your models here.
class SystemAdmin(admin.AdminSite):
    site_header = 'System Admin'


system_admin_site = SystemAdmin(name='SystemAdmin')

system_admin_site.register(Patient)
system_admin_site.register(Doctor)

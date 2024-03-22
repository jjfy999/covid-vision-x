from django.contrib import admin
from django.contrib.auth.models import Permission

from .models import Account, Doctor, Patient, SystemAdmin

# from django.contrib.auth.admin import GroupAdmin
# from django.contrib.auth.models import Group


class SystemAdminArea(admin.AdminSite):
    site_header = 'System Admin'


system_admin_site = SystemAdminArea(name='SystemAdmin')

# system_admin_site.register(Group)
# system_admin_site.register(GroupAdmin)
system_admin_site.register(Patient)
system_admin_site.register(Doctor)
system_admin_site.register(SystemAdmin)
system_admin_site.register(Account)

admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(SystemAdmin)
admin.site.register(Account)
admin.site.register(Permission)

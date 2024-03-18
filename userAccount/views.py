from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
# Create your views here.


def loginPage(request):
    
    return render(request, 'login.html')

'''
def updatedetails(request):

    if request.method == 'POST':
        user = request.user
        new_username = request.POST.get('newUsername')
        new_email = request.POST.get('newEmail')
        
        user.update_details(new_username, new_email)

        messages.success(request, "Details updated successfully!")
        return redirect('accdetails')  # Redirect to the user details page
    
    else:
        return render(request, 'update_details.html')  # Render the update details form
    
'''
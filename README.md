# covid-vision-x

$ py manage.py reset_db
(This is to delete all user records and re-populate 1 admin, 1 doctor, 1 patient + 10 random users into table via hardcode)
(Remove comments to generate 10 random patients + doctors)
(Run this before running $ py manage.py runserver)

$ py manage.py runserver

$ py manage.py collectstatic

$ py manage.py makemigrations <ModelName>
$ py manage.py migrate

online site below (Currently using postgres RDS and images S3 private bucket) For backend
http://fypbackend.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com

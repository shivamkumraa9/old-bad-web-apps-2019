from django.db import models
from django.contrib.auth.models import User


class Link(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    link_type = models.CharField(max_length = 1)

    def __str__(self):
        return self.user.username + self.link_type


class Employer(models.Model):
    link = models.OneToOneField(Link,on_delete = models.CASCADE)
    profile_pic = models.ImageField(upload_to ='uploads/',default='123.jpg',blank = True,null = True)
    full_name = models.CharField(max_length=30,blank = True,null = True)
    since = models.CharField(max_length=30,blank = True,null = True)
    team_size = models.CharField(max_length=30,blank = True,null = True)
    phone = models.CharField(max_length = 30,blank = True,null = True)
    country = models.CharField(max_length = 30,blank = True,null = True)
    city = models.CharField(max_length = 30,blank = True,null = True)
    description = models.TextField(blank = True,null = True)
    linkedin = models.CharField(max_length = 30,blank = True,null = True)
    twitter = models.CharField(max_length = 30,blank = True,null = True)
    facebook = models.CharField(max_length = 30,blank = True,null = True)
    website = models.CharField(max_length = 30,blank = True,null = True)
    has_profile = models.BooleanField(default = False)

    def __str__(self):
        return self.link.user.username


class Candidate(models.Model):
    link = models.OneToOneField(Link,on_delete = models.CASCADE)
    profile_pic = models.ImageField(upload_to ='uploads/',default='123.jpg',blank = True,null = True)
    full_name = models.CharField(max_length=30,blank = True,null = True)
    job_title = models.CharField(max_length = 30,blank = True,null = True)
    current_salary = models.CharField(max_length = 30,blank = True,null = True)   
    current_company = models.CharField(max_length = 30,blank = True,null = True)
    experience_level = models.CharField(max_length = 30,blank = True,null = True)
    education_level = models.CharField(max_length = 30,blank = True,null = True)
    catagory = models.CharField(max_length = 30,blank = True,null = True)
    gender = models.CharField(max_length = 30,blank = True,null = True)
    expected_salary = models.CharField(max_length = 30,blank = True,null = True)
    age = models.IntegerField(blank = True,null = True)
    description = models.TextField(blank = True,null = True)
    linkedin = models.CharField(max_length = 30,blank = True,null = True)
    facebook = models.CharField(max_length = 30,blank = True,null = True)
    blog = models.CharField(max_length = 30,blank = True,null = True)
    website = models.CharField(max_length = 30,blank = True,null = True)
    phone = models.CharField(max_length = 30,blank = True,null = True)
    country = models.CharField(max_length = 30,blank = True,null = True)
    city = models.CharField(max_length = 30,blank = True,null = True)
    has_resume = models.BooleanField(default = False)
    has_profile = models.BooleanField(default = False)

    def __str__(self):
        return self.link.user.username

class Job(models.Model):
    employer = models.ForeignKey(Employer,on_delete = models.CASCADE)
    title = models.CharField(max_length=30,blank = True,null = True)
    salary_offered = models.CharField(max_length=30,blank = True,null = True)
    experience_required = models.CharField(max_length=30,blank = True,null = True)
    education_level = models.CharField(max_length=30,blank = True,null = True)
    catagory = models.CharField(max_length=30,blank = True,null = True)
    gender = models.CharField(max_length=30,blank = True,null = True)
    job_type = models.CharField(max_length=30,blank = True,null = True)
    description = models.TextField(blank = True,null = True)
    status = models.CharField(max_length=30,default = 'open')
    country = models.CharField(max_length = 30,blank = True,null = True)
    city = models.CharField(max_length = 30,blank = True,null = True)
    applicants = models.ManyToManyField(Candidate,blank = True)

    def __str__(self):
        return f'{self.title}'

class Education(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    level = models.CharField(max_length = 30,blank = True,null = True)
    start = models.CharField(max_length = 30,blank = True,null = True)
    end = models.CharField(max_length = 30,blank = True,null = True)
    institution = models.CharField(max_length = 30,blank = True,null = True)
    degree = models.CharField(max_length = 30,blank = True,null = True)
    description = models.TextField(blank = True,null = True)

    def __str__(self):
        return self.institution or 'hmm'

class Experience(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    company_name = models.CharField(max_length = 30,blank = True,null = True)
    start = models.CharField(max_length = 30,blank = True,null = True)
    end = models.CharField(max_length = 30,blank = True,null = True)
    role = models.CharField(max_length = 30,blank = True,null = True)
    description = models.TextField(blank = True,null = True)

    def __str__(self):
        return self.company_name or 'hmm'

class Portfolio(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    image = models.ImageField(upload_to ='uploads/',blank = True,null = True)
    description = models.TextField(blank = True,null = True)
    name = models.CharField(max_length = 30,blank = True,null = True)

    def __str__(self):
        return self.name

class Skill(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    name = models.CharField(max_length = 30,blank = True,null = True)
    percentage = models.IntegerField()

    def __str__(self):
        return self.name

class Award(models.Model):
    candidate = models.ForeignKey(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    name = models.CharField(max_length = 30,blank = True,null = True)
    year = models.CharField(max_length = 30,blank = True,null = True)
    description = models.TextField(blank = True,null = True)

    def __str__(self):
        return self.name


class AppliedJobs(models.Model):
    candidate = models.OneToOneField(Candidate,on_delete = models.CASCADE,blank = True,null = True)
    jobs = models.ManyToManyField(Job,blank = True)

    def __str__(self):
        return self.candidate.link.user.username
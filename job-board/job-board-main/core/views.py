from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Q

from core.models import AppliedJobs,Link,Candidate,Employer,Experience,Education,Portfolio,Skill,Award,Job
from core.forms import EmployerForm,CandidateForm,ExperienceForm,EducationForm,PortfolioForm,SkillForm,AwardForm,JobForm
from django.views.decorators.csrf import csrf_exempt

import json

def job_search(request):
    return render(request,"job_search.html")

def only_candidate(function):
    def inside(request,*args,**kwargs):
        if request.user_type == "C":
            return function(request,*args,**kwargs)
        return JsonResponse({"Status":"Permission Denied"})
    return inside

def only_employer(function):
    def inside(request,*args,**kwargs):
        if request.user_type == "E":
            return function(request,*args,**kwargs)
        return JsonResponse({"Status":"Permission Denied"})
    return inside


@csrf_exempt
def job_query(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if 'keyword' in data and 'page' in data:
            limit = 1
            q_object = Q(title__icontains=data['keyword']) | Q(description__icontains=data['keyword'])
            queryset = Job.objects.filter(q_object,status = 'open').order_by('-pk')

            if data.get("gender"):
                queryset = queryset.filter(gender__in = data['gender'])

            if data.get("city"):
                queryset = queryset.filter(city__icontains = data['city'])

            if data.get("country"):
                queryset = queryset.filter(country__icontains = data['country'])

            if data.get("job_type"):
                queryset = queryset.filter(job_type__in = data['job_type'])

            if data.get("catagory"):
                queryset = queryset.filter(catagory__in = data['catagory'])

            if data.get("education_level"):
                queryset = queryset.filter(education_level__in = data['education_level'])

            if data.get("experience_required"):
                queryset = queryset.filter(experience_required__in = data['experience_required'])

            if data.get("salary_offered"):
                queryset = queryset.filter(salary_offered__in = data['salary_offered'])
            if request.user.is_authenticated and request.user_type == 'C':
                pks = [i.pk for i in request.link.appliedjobs.jobs.all()]
                queryset = queryset.exclude(pk__in = pks)
            queryset = queryset[data['page']*limit:(data['page']*limit)+limit]
            ready = []
            for i in queryset:
                ready.append({'url':i.employer.profile_pic.url,'username':i.employer.link.user.username,'company_name':i.employer.full_name,'title':i.title,'pk':i.pk,'country':i.country,'city':i.city,'job_type':i.job_type})
            return JsonResponse({"status":"okay","data":ready})
    return JsonResponse({"status":"fail"})



@login_required
@only_candidate
def apply(request,pk):
    job = get_object_or_404(Job,pk = pk)
    if job in request.link.appliedjobs.jobs.all():
        return redirect("core:job_single",pk = job.pk)
    job.applicants.add(request.link)
    request.link.appliedjobs.jobs.add(job)
    return redirect("core:job_single",pk = job.pk)

@login_required
@only_employer
def resumes(request,pk):
    job = get_object_or_404(Job,pk = pk,employer = request.link)
    return render(request,"resumes.html",{"job":job,"applicants":job.applicants.all()})

@login_required
@only_employer
def remove_resume(request,job_id,can_id):
    job = get_object_or_404(Job,pk = job_id,employer = request.link)
    can = get_object_or_404(Candidate,pk = can_id)
    job.applicants.remove(can)
    can.appliedjobs.jobs.remove(job)
    return JsonResponse({"status":"okay"})

def employer_single(request,pk):
    emp = get_object_or_404(Employer,pk = pk)
    jobs = Job.objects.filter(employer = emp)
    return render(request,"employer_single.html",{"emp":emp,"jobs":jobs})

def job_single(request,pk):
    job = get_object_or_404(Job,pk = pk)
    applied = False 
    if request.user.is_authenticated and request.user_type == 'C':
        if job in  request.link.appliedjobs.jobs.all():
            applied = True
    return render(request,"job_single.html",{"job":job,"applied":applied})


@login_required
@only_employer
def employer_dashboard(request):
    return render(request,"employer_dashboard.html")

@login_required
@only_employer
def employer_profile(request):
    if request.method == "POST":
        obj = request.link
        if request.FILES:
            img = request.FILES.get("filename")
            obj.profile_pic = img
        f = EmployerForm(request.POST,request.FILES,instance = obj)
        if f.is_valid():
            f.save()
        return redirect("core:employer_profile")

    return render(request,"employer_profile.html")

@login_required
@only_employer
def employer_jobs(request):
    jobs = Job.objects.filter(employer = request.link)
    return render(request,"employer_jobs.html",{'jobs':jobs})

@login_required
@only_employer
def employer_newjob(request):
    if request.method == "POST":
        f = JobForm(request.POST)
        if f.is_valid():
            f = f.save(commit = False)
            f.employer = request.link
            f.save()
            return redirect("core:employer_jobs")
    return render(request,"employer_newjob.html")

@login_required
@only_employer
def employer_editjob(request,pk):
    job = get_object_or_404(Job,pk = pk,employer = request.link)
    if request.method == "POST":
        f = JobForm(request.POST,instance = job)
        if f.is_valid():
            f = f.save()
            return redirect("core:employer_jobs")
    return render(request,"employer_editjob.html",{'job':job})

@login_required
@only_employer
def employer_deletejob(request,pk):
    job = get_object_or_404(Job,pk = pk,employer = request.link)
    job.delete()
    return JsonResponse({"status":"okay"})




def index(request):
    jobs = Job.objects.all()[:8]
    return render(request,"index.html",{'jobs':jobs})


def candidate_single(request,pk):
    link = get_object_or_404(Candidate,pk = pk)
    context = {}
    context['uu'] = link.link.user
    context['link'] = link
    context['exp'] = Experience.objects.filter(candidate =link)
    context['edu'] = Education.objects.filter(candidate =link)
    context['por'] = Portfolio.objects.filter(candidate =link)
    context['ski'] = Skill.objects.filter(candidate =link)
    context['awa'] = Award.objects.filter(candidate =link)
    return render(request,"candidate_single.html",context)

@login_required
@only_candidate
def applied_jobs(request):
    return render(request,"applied_jobs.html")

def register(request):
    if request.user.is_authenticated:
        return redirect("core:dashboard")
    context = {}
    if request.method == 'POST':
        data = request.POST
        u = User.objects.filter(username=data.get("username"))
        e = User.objects.filter(email=data.get("email"))
        context['email'] = data.get("email")
        context['password'] = data.get("password")
        context['username'] = data.get("username")
        if u and e:
            context['error'] = 'Username and Email Already Exists'
        elif u:
            context['error'] = 'Username Already Exists'
        elif e:
            context['error'] = 'Email Already Exists'
        else:
            user = User.objects.create_user(username=data.get("username"),email = data.get("email"),password = data.get("password"))
            if data.get("type") == "candidate":
                l = Link.objects.create(user = user,link_type = "C")
                c = Candidate.objects.create(link = l)
                AppliedJobs.objects.create(candidate = c)
            else:
                l = Link.objects.create(user = user,link_type = "E")
                Employer.objects.create(link = l)
            login(request,user)
            return redirect("core:dashboard")
    return render(request,"register.html",context = context)

@login_required
@only_candidate
def dashboard(request):
    return render(request,"candidate_dashboard.html")

def login_view(request):
    if request.user.is_authenticated:
        if request.user_type == 'C':
            return redirect("core:dashboard")
        return redirect("core:employer_dashboard")
    context = {}
    if request.method == 'POST':
        data = request.POST
        u = User.objects.filter(username=data.get("email"))
        if not u:
            u = User.objects.filter(email=data.get("email"))
        if u:
            user = authenticate(request, username=u[0].username, password=data.get("password"))
            if user:
                login(request,user)
                print(user.link.link_type)
                if user.link.link_type == 'C':
                    return redirect("core:dashboard")
                return redirect("core:employer_dashboard")
        context['error'] = 'Invalid Username/Email or Password'
    return render(request,"login.html",context = context)

@login_required
def change_password(request):
    context = {}
    if request.method == "POST":
        data = request.POST
        user = authenticate(request, username=request.user.username, password=data.get("old"))
        if user:
            if data.get("new1") == data.get("new2"):
                user.set_password(data.get("new1"))
                return redirect("core:dashboard")
            else:
                context['error'] = 'New passwords did not matched'
        else:
            context['error'] = 'Invalid Current Password'
    return render(request,"change_password.html",context)

def logout_view(request):
    logout(request)
    return redirect("core:login")


@login_required
@only_candidate
def candidate_profile(request):
    if request.method == "POST":
        obj = request.link
        if request.FILES:
            img = request.FILES.get("filename")
            obj.profile_pic = img
        f = CandidateForm(request.POST,request.FILES,instance = obj)
        if f.is_valid():
            f.save()
        return redirect("core:candidate_profile")
    return render(request,"candidate_profile.html")

@login_required
@only_candidate
def edit_resume(request):
    context = {}
    context['exp'] = Experience.objects.filter(candidate = request.link)
    context['edu'] = Education.objects.filter(candidate = request.link)
    context['por'] = Portfolio.objects.filter(candidate = request.link)
    context['ski'] = Skill.objects.filter(candidate = request.link)
    context['awa'] = Award.objects.filter(candidate = request.link)
    return render(request,"edit_resume.html",context)


# Experience CRUD
@login_required
@csrf_exempt
@only_candidate
def exp_create(request):
    if request.method == "POST":
        f = ExperienceForm(request.POST)
        if f.is_valid():
            f = f.save(commit = False)
            f.candidate = request.link
            f.save()
            return JsonResponse({"status":"okay","pk":f.pk})
        return JsonResponse({"status":"error"})
    return JsonResponse({"status":"not allowed"})

@login_required
@csrf_exempt
@only_candidate
def exp_delete(request,pk):
    if request.method == "POST":
        obj = get_object_or_404(Experience,pk = pk,candidate = request.link)
        obj.delete()
        return JsonResponse({"status":"okay"})
    return JsonResponse({"status":"not allowed"})

# Education Crud

@login_required
@csrf_exempt
@only_candidate
def edu_create(request):
    if request.method == "POST":
        f = EducationForm(request.POST)
        if f.is_valid():
            f = f.save(commit = False)
            f.candidate = request.link
            f.save()
            return JsonResponse({"status":"okay","pk":f.pk})
        return JsonResponse({"status":"error"})
    return JsonResponse({"status":"not allowed"})

@login_required
@csrf_exempt
@only_candidate
def edu_delete(request,pk):
    if request.method == "POST":
        obj = get_object_or_404(Education,pk = pk,candidate = request.link)
        obj.delete()
        return JsonResponse({"status":"okay"})
    return JsonResponse({"status":"not allowed"})

#Portfolio CRUD

@login_required
@csrf_exempt
@only_candidate
def por_create(request):
    if request.method == "POST":
        f = PortfolioForm(request.POST,request.FILES)
        if f.is_valid():
            f = f.save(commit = False)
            f.candidate = request.link
            f.save()
            return redirect("core:edit_resume")
        return JsonResponse({"status":"error"})
    return JsonResponse({"status":"not allowed"})

@login_required
@csrf_exempt
@only_candidate
def por_delete(request,pk):
    if request.method == "POST":
        obj = get_object_or_404(Portfolio,pk = pk,candidate = request.link)
        obj.delete()
        return JsonResponse({"status":"okay"})
    return JsonResponse({"status":"not allowed"})


#Skill CRUD

@login_required
@csrf_exempt
@only_candidate
def ski_create(request):
    if request.method == "POST":
        f = SkillForm(request.POST)
        if f.is_valid():
            f = f.save(commit = False)
            f.candidate = request.link
            f.save()
            return JsonResponse({"status":"okay","pk":f.pk})
        print(f.errors)
        return JsonResponse({"status":"error"})
    return JsonResponse({"status":"not allowed"})

@login_required
@csrf_exempt
@only_candidate
def ski_delete(request,pk):
    if request.method == "POST":
        obj = get_object_or_404(Skill,pk = pk,candidate = request.link)
        obj.delete()
        return JsonResponse({"status":"okay"})
    return JsonResponse({"status":"not allowed"})


# Award
@login_required
@csrf_exempt
@only_candidate
def awa_create(request):
    if request.method == "POST":
        f = AwardForm(request.POST)
        if f.is_valid():
            f = f.save(commit = False)
            f.candidate = request.link
            f.save()
            return JsonResponse({"status":"okay","pk":f.pk})
        print(f.errors)
        return JsonResponse({"status":"error"})
    return JsonResponse({"status":"not allowed"})



@login_required
@csrf_exempt
@only_candidate
def awa_delete(request,pk):
    if request.method == "POST":
        obj = get_object_or_404(Award,pk = pk,candidate = request.link)
        obj.delete()
        return JsonResponse({"status":"okay"})
    return JsonResponse({"status":"not allowed"})
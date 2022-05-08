from django.views.generic import TemplateView
from django.urls import path
from core import views

app_name = 'core'


urlpatterns = [
	path('job-query/',views.job_query,name='job_query'),
	path('job-search/',views.job_search,name='job_search'),

	path('apply/<int:pk>/',views.apply,name='apply'),

	path('employer-dashboard/',views.employer_dashboard,name='employer_dashboard'),
	path('employer-profile/',views.employer_profile,name='employer_profile'),
	path('employer-jobs/',views.employer_jobs,name='employer_jobs'),


	path('employer-single/<int:pk>/',views.employer_single,name='employer_single'),
	path('job-single/<int:pk>/',views.job_single,name='job_single'),
	path('job-single/<int:pk>/resumes/',views.resumes,name='resumes'),

	path('remove-resume/<int:job_id>/<int:can_id>/',views.remove_resume,name='remove_resume'),

	path('employer-newjob/',views.employer_newjob,name='employer_newjob'),
	path('employer-editjob/<int:pk>/',views.employer_editjob,name='employer_editjob'),
	path('employer-deletejob/<int:pk>/',views.employer_deletejob,name='employer_deletejob'),


	path('',views.index,name='index'),
	path('candidate-single/<int:pk>/',views.candidate_single,name='candidate_single'),
	path('applied-jobs/',views.applied_jobs,name='applied_jobs'),

	path('about/',TemplateView.as_view(template_name = 'about.html'),name='about'),
	path('contact/',TemplateView.as_view(template_name = 'contact.html'),name='contact'),

	path('register/',views.register,name='register'),
	path('login/',views.login_view,name='login'),
	path('logout/',views.logout_view,name='logout'),
	path('change-password/',views.change_password,name='change_password'),


	path('dashboard/',views.dashboard,name='dashboard'),
	path('candidate-profile/',views.candidate_profile,name='candidate_profile'),
	path('edit-resume/',views.edit_resume,name='edit_resume'),

	path('api/exp-create/',views.exp_create,name='exp_create'),
	path('api/exp-delete/<int:pk>/',views.exp_delete,name='exp_delete'),

	path('api/edu-create/',views.edu_create,name='edu_create'),
	path('api/edu-delete/<int:pk>/',views.edu_delete,name='edu_delete'),

	path('api/por-create/',views.por_create,name='por_create'),
	path('api/por-delete/<int:pk>/',views.por_delete,name='por_delete'),

	path('api/ski-create/',views.ski_create,name='ski_create'),
	path('api/ski-delete/<int:pk>/',views.ski_delete,name='ski_delete'),

	path('api/awa-create/',views.awa_create,name='awa_create'),
	path('api/awa-delete/<int:pk>/',views.awa_delete,name='awa_delete'),

]

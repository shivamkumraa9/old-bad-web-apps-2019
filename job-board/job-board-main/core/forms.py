from django.forms import ModelForm
from core.models import Candidate,Experience,Education,Portfolio,Skill,Award,Employer,Job

class JobForm(ModelForm):
	class Meta:
		model = Job
		exclude = ("employer","applicants","status")

class ExperienceForm(ModelForm):
	class Meta:
		model = Experience
		fields = "__all__"


class EducationForm(ModelForm):
	class Meta:
		model = Education
		fields = "__all__"

class PortfolioForm(ModelForm):
	class Meta:
		model = Portfolio
		fields = "__all__"

class SkillForm(ModelForm):
	class Meta:
		model = Skill
		fields = "__all__"

class AwardForm(ModelForm):
	class Meta:
		model = Award
		fields = "__all__"


class CandidateForm(ModelForm):
	class Meta:
		model = Candidate
		exclude = ("link","has_resume","has_profile","current_skills")

class EmployerForm(ModelForm):
	class Meta:
		model = Employer
		exclude = ("link","has_profile")
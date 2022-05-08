from django.forms import ModelForm

from core.models import Order 


class OrderForm(ModelForm):
	class Meta:
		model = Order
		exclude = ['order_id','status','total']

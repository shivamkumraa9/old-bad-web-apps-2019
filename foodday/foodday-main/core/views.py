from django.shortcuts import render, get_object_or_404, redirect
from core.models import Catagory, Product, OrderItem, Order
from core.forms import OrderForm

import json

def index(request):
	return render(request,"index.html",{
		"catagories":Catagory.objects.all(),
		"products":Product.objects.all(),
		"header_transparent": True
	})

def contact(request):
	return render(request,"contact.html")

def about(request):
	return render(request,"about.html")

def menu(request):
	return render(request,"menu.html",{
		"catagories":Catagory.objects.all(),
		"products":Product.objects.all()
	})

def cart(request):
	return render(request,"cart.html")

def product(request, pk):
	product = get_object_or_404(Product, pk=pk)
	return render(request,"product.html", {"product": product})

def checkout(request):
	if request.method == "POST":
		f = OrderForm(request.POST)
		if f.is_valid():
			o = f.save()
			for i in json.loads(request.POST.get("pks")):
				product = Product.objects.get(pk = int(i['pk']))
				OrderItem.objects.create(product=product, 
						quantity=int(i['quantity']), order=o)
				print(o.total)
				print(product.price*int(i['quantity']))
				o.total += product.price*int(i['quantity'])
			o.save()
			return redirect("core:thankyou",order_id = o.order_id)
	return render(request,"checkout.html")

def reservation(request):
	return render(request,"reservation.html")

def thankyou(request, order_id):
	return render(request,"thankyou.html", {"order_id":order_id})

def track(request):
	number = request.GET.get("number")
	if number:
		try:
			order = Order.objects.get(order_id=number)
			message = f"Order Status : {order.get_status_display()}"
		except:
			message = "Order Not Found"
	else:
		message = "Track your Order"
	return render(request,"track.html", {"message":message, "number":number})


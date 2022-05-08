from django.urls import path
from core import views
from django.views.generic import TemplateView

app_name = "core"

urlpatterns = [
	path('', views.index, name='index'),
	path('contact/', views.contact, name='contact'),
	path('about/', views.about, name='about'),
	path('menu/', views.menu, name='menu'),
	path('cart/', views.cart, name='cart'),
	path('product/<int:pk>/', views.product, name='product'),
    path('checkout/', views.checkout, name='checkout'),
    path('reservation/', views.reservation, name='reservation'),
    path('thankyou/<int:order_id>/', views.thankyou, name='thankyou'),
    path('track/', views.track, name='track'),

	# path('menu/',views.menu,name = 'menu'),
	# path('checkout/',views.checkout,name = 'checkout'),
	# path('track-order/',views.track_order,name = 'track_order'),
	# path('api/track-order/<slug:number>/',views.track_order_num,name = 'track_order_num'),

	# path('thank-you/<slug:number>/', views.thank_you,name="thank_you"),
	# path('product/<int:pk>/', views.product,name="product"),

	# path('cart/', TemplateView.as_view(template_name="cart.html"),name="cart"),
    # path('about/', TemplateView.as_view(template_name="about.html"),name="about"),
    # path('contact/', TemplateView.as_view(template_name="contact.html"),name="contact"),
]

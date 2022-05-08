from django.contrib import admin

from core.models import (Product, Catagory, Order, OrderItem)

admin.site.register([Product, Catagory])


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    fields = ['name', 'price', 'quantity']
    readonly_fields = ('name', 'price', 'quantity')

    def name(self, obj):
        return obj.product.name

    def price(self, obj):
        return obj.product.price

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class OrderAdmin(admin.ModelAdmin):
    model = Order
    readonly_fields = ('name', 'email', 'phone', 'country', 'city', 'zip_code', 'address', 'order_id', 'total')

    inlines = [
        OrderItemInline,
    ]


admin.site.register(Order, OrderAdmin)

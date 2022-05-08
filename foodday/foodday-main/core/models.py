from django.db import models


class Catagory(models.Model):
    """
    This model represents the catagory for the product
    eg : Breakfast, Lunch, Dessert etc.
    """
    name = models.CharField(max_length = 10)
    image_path = models.CharField(max_length=100)

    def __str__(self):
        return self.name 


class Product(models.Model):
    """
    This model represents the main food product
    """
    catagory = models.ManyToManyField(Catagory, 
                    related_name="catagory_products")
    name = models.CharField(max_length=50)
    description = models.TextField()
    image_path = models.CharField(max_length=100)
    price = models.FloatField()
    chef_name = models.CharField(max_length=30)

    @property
    def short_description(self):
        return self.description[0:60]
    
    @property
    def get_catagories(self):
        return ', '.join([catagory.name for catagory in self.catagory.all()])

    def __str__(self):
        return self.name


class Order(models.Model):
    """
    This model stores the order related stuff
    """
    ORDER_STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('on_the_way', 'On The Way'),
        ('delivered', 'Delivered')
    )

    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=15)
    country = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    zip_code = models.CharField(max_length=10)
    address = models.CharField(max_length=100)

    order_id = models.CharField(max_length=6, blank=True, unique=True)
    status = models.CharField(max_length=15, 
                choices=ORDER_STATUS_CHOICES, default="processing")
    
    total = models.FloatField(default=0)

    def generate_order_id(self):
        """
        Util method to generate a 6 digit random order id
        """
        import random
        random_nums = random.choices('123456789', k=6)
        
        # join the list of random nums to form a string
        return ''.join(random_nums)

    def save(self, *args, **kwargs):
        """
        Overide the save method to set the random order id
        """

        # only set the order id if order has never been created
        if not self.pk:
            self.order_id = self.generate_order_id()
        
        super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return self.name



class OrderItem(models.Model):
    """
    This model represents the order item for the order
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return self.product.name

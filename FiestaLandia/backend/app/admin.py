from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import *

admin.site.register(Usuario)
admin.site.register(TipoUsuario)
admin.site.register(Grupos)
admin.site.register(Banquetes)
admin.site.register(SalonesEventos)
admin.site.register(Mobiliario)
admin.site.register(Decoradores)
admin.site.register(Categoria)
admin.site.register(Producto)
admin.site.register(MetodoPago)
admin.site.register(Carrito)
admin.site.register(CarritoDetalle)
admin.site.register(Pedido)

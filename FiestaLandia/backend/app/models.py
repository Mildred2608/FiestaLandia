from django.db import models

# Create your models here.
from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nombre


class Categoria(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    imagen_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nombre


class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.CharField(max_length=255, blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, related_name='productos')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True, related_name='productos')

    def __str__(self):
        return self.nombre


class Carrito(models.Model):
    METODOS_PAGO = [
        ('credito', 'Crédito'),
        ('debito', 'Débito'),
        ('efectivo', 'Efectivo'),
    ]

    ESTATUS = [
        ('pendiente', 'Pendiente'),
        ('pagado', 'Pagado'),
        ('cancelado', 'Cancelado'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='carritos')
    fecha_creado = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.CharField(max_length=10, choices=METODOS_PAGO, null=True, blank=True)
    estatus = models.CharField(max_length=10, choices=ESTATUS, default='pendiente')
    fecha_pago = models.DateTimeField(null=True, blank=True)
    cuotas_credito = models.IntegerField(null=True, blank=True)
    intervalo_cuotas = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"Carrito #{self.id} - {self.usuario.nombre}"


class CarritoDetalle(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.producto.nombre} x {self.cantidad}"

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class TipoUsuario(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class UsuarioManager(BaseUserManager):
    def create_user(self, correo_electronico, password=None, **extra_fields):
        if not correo_electronico:
            raise ValueError('El correo electrónico es obligatorio')
        email = self.normalize_email(correo_electronico)
        user = self.model(correo_electronico=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo_electronico, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        tipo_admin, _ = TipoUsuario.objects.get_or_create(
            nombre='admin',
            defaults={'descripcion': 'Administrador del sistema'}
        )
        extra_fields.setdefault('tipo_usuario', tipo_admin)
        
        return self.create_user(correo_electronico, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    correo_electronico = models.EmailField(_('email address'), unique=True)
    Nombre_Completo = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    Direccion_envio = models.TextField(blank=True, null=True)
    tipo_usuario = models.ForeignKey(TipoUsuario, on_delete=models.SET_NULL, null=True)
    activo = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo_electronico'
    REQUIRED_FIELDS = ['Nombre_Completo']

    def __str__(self):
        return self.correo_electronico

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class Grupos(models.Model):
    GENERO_CHOICES = [
        ('Sonideros', 'Sonideros'),
        ('Rancheros', 'Rancheros'),
        ('Cumbias', 'Cumbias'),
        ('Mariachis', 'Mariachis'),
        ('Baladas', 'Baladas'),
    ]

    Nombre_grupo = models.CharField(max_length=100)
    Años_trayec = models.IntegerField(null=True, blank=True)
    Numero_music = models.IntegerField(null=True, blank=True)
    costos_paquetes = models.DecimalField(max_digits=10, decimal_places=2)
    Equipo = models.CharField(max_length=100, blank=True, null=True)
    Costo_extra = models.DecimalField(max_digits=10, decimal_places=2)
    URL = models.URLField(max_length=255, blank=True, null=True)
    Genero = models.CharField(max_length=20, choices=GENERO_CHOICES)

    def __str__(self):
        return self.Nombre_grupo

class Banquetes(models.Model):
    nombre_empresa = models.CharField(max_length=100)
    tipo_comida = models.CharField(max_length=100)
    capacidad_personas = models.IntegerField(null=True, blank=True)
    incluye_bebidas = models.BooleanField(default=False)
    precio_por_persona = models.DecimalField(max_digits=10, decimal_places=2)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nombre_empresa

class SalonesEventos(models.Model):
    nombre_salon = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200, blank=True, null=True)
    capacidad = models.IntegerField(null=True, blank=True)
    incluye_estacionamiento = models.BooleanField(default=False)
    aire_acondicionado = models.BooleanField(default=False)
    precio_renta = models.DecimalField(max_digits=10, decimal_places=2)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    url = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nombre_salon

class Mobiliario(models.Model):
    TIPO_CHOICES = [
        ('Sillas', 'Sillas'),
        ('Mesas', 'Mesas'),
        ('Carpas', 'Carpas'),
        # Agrega más tipos según necesites
    ]

    tipo_mobiliario = models.CharField(max_length=100, choices=TIPO_CHOICES)
    cantidad_disponible = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=50, blank=True, null=True)
    material = models.CharField(max_length=50, blank=True, null=True)
    proveedor = models.CharField(max_length=100, blank=True, null=True)
    telefono_proveedor = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_mobiliario} - {self.color}"

class Decoradores(models.Model):
    nombre_empresa = models.CharField(max_length=100, blank=True, null=True)
    estilo_especialidad = models.CharField(max_length=100)
    precio_base = models.DecimalField(max_digits=10, decimal_places=2)
    servicios_incluidos = models.TextField(blank=True, null=True)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    url_portafolio = models.URLField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.nombre_empresa or self.contacto

class Categoria(models.Model):
    CATEGORIA_CHOICES = [
        ('Grupos Musicales', 'Grupos Musicales'),
        ('Banquetes', 'Banquetes'),
        ('Salones de Eventos', 'Salones de Eventos'),
        ('Mobiliario', 'Mobiliario'),
        ('Decoradores', 'Decoradores'),
    ]

    Nombre_Cat = models.CharField(
        max_length=100,
        primary_key=True,
        choices=CATEGORIA_CHOICES,
        verbose_name="Nombre de Categoría"
    )
    
    # Relaciones con otras tablas (usando los nombres de campo de tu SQL)
    id_grupo = models.ForeignKey(
        'Grupos',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='id_grupo'
    )
    id_banquete = models.ForeignKey(
        'Banquetes',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='id_banquete'
    )
    id_salon = models.ForeignKey(
        'SalonesEventos',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='id_salon'
    )
    id_mobiliario = models.ForeignKey(
        'Mobiliario',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='id_mobiliario'
    )
    id_decorador = models.ForeignKey(
        'Decoradores',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_column='id_decorador'
    )

    class Meta:
        db_table = 'Categoria'  # Nombre exacto de la tabla en BD
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"

    def __str__(self):
        return self.Nombre_Cat


class MetodoPago(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    requiere_detalles = models.BooleanField(default=False)
    activo = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.CharField(max_length=255, blank=True, null=True)
    stock = models.IntegerField(default=0)
    Nombre_Cat = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        db_column='Nombre_Cat'  # Usamos el nombre exacto de la columna
    )
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'Producto'  # Nombre exacto de la tabla
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.nombre

class Carrito(models.Model):
    ESTATUS_CHOICES = [
        ('activo', 'Activo'),
        ('pendiente', 'Pendiente'),
        ('pagado', 'Pagado'),
        ('cancelado', 'Cancelado'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha_creado = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.SET_NULL, null=True, blank=True)
    estatus = models.CharField(max_length=10, choices=ESTATUS_CHOICES, default='activo')
    fecha_pago = models.DateTimeField(null=True, blank=True)
    cuotas_credito = models.IntegerField(null=True, blank=True)
    intervalo_cuotas = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"Carrito #{self.id} - {self.usuario.Nombre_Completo}"

class CarritoDetalle(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    fecha_agregado = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.total = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.producto.nombre} x {self.cantidad}"

class Pedido(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('procesando', 'Procesando'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ]

    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.ForeignKey(MetodoPago, on_delete=models.SET_NULL, null=True)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='pendiente')
    direccion_envio = models.TextField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    impuestos = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    descuentos = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    notas = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Pedido #{self.id} - {self.usuario.Nombre_Completo if self.usuario else 'Usuario eliminado'}"

class PedidoDetalle(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    descuento_unitario = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.subtotal = self.cantidad * (self.precio_unitario - self.descuento_unitario)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.producto.nombre if self.producto else 'Producto eliminado'} x {self.cantidad}"

class Orden(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('pagada', 'Pagada'),
        ('cancelada', 'Cancelada'),
    ]

    pedido = models.ForeignKey(Pedido, on_delete=models.SET_NULL, null=True)
    numero_orden = models.CharField(max_length=50, unique=True)
    fecha_orden = models.DateTimeField(auto_now_add=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    impuestos = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='pendiente')
    xml_factura = models.TextField(blank=True, null=True)
    pdf_factura = models.BinaryField(blank=True, null=True)

    def __str__(self):
        return f"Orden #{self.numero_orden}"
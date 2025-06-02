CREATE DATABASE IF NOT EXISTS fiestalandia;

USE fiestalandia;

-- Tabla: Tipo_Usuario
CREATE TABLE Tipo_Usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla: Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    Direccion_envio TEXT,
    Correo_electronico VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_tipo_usuario INT,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_tipo_usuario) REFERENCES Tipo_Usuario(id_tipo_usuario)
        ON DELETE SET NULL ON UPDATE CASCADE
);


-- Tabla: Grupos
CREATE TABLE Grupos (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre_grupo VARCHAR(100) NOT NULL,
    Años_trayec INT,
    Numero_music INT,
    costos_paquetes DECIMAL(10,2) NOT NULL,
    Equipo VARCHAR(100),
    Costo_extra DECIMAL(10,2) NOT NULL,
    URL VARCHAR(255),
    Genero ENUM('Sonideros', 'Rancheros', 'Cumbias', 'Mariachis', 'Baladas')
);
-- Tabla: Baquetes 
CREATE TABLE Banquetes (
    id_banquete INT PRIMARY KEY AUTO_INCREMENT,
    nombre_empresa VARCHAR(100) NOT NULL,
    tipo_comida VARCHAR(100), -- ej. Mexicana, Internacional, Buffet, etc.
    capacidad_personas INT,
    incluye_bebidas BOOLEAN,
    precio_por_persona DECIMAL(10,2),
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    url VARCHAR(255)
);
-- Tabla:  Salones_Eventos
CREATE TABLE Salones_Eventos (
    id_salon INT PRIMARY KEY AUTO_INCREMENT,
    nombre_salon VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    capacidad INT,
    incluye_estacionamiento BOOLEAN,
    aire_acondicionado BOOLEAN,
    precio_renta DECIMAL(10,2),
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    url VARCHAR(255)
);
-- Tabla:  Mobiliario
CREATE TABLE Mobiliario (
    id_mobiliario INT PRIMARY KEY AUTO_INCREMENT,
    tipo_mobiliario VARCHAR(100), -- ej. Sillas, Mesas, Carpas, etc.
    cantidad_disponible INT,
    precio_unitario DECIMAL(10,2),
    color VARCHAR(50),
    material VARCHAR(50), -- ej. Madera, Plástico, Metal
    proveedor VARCHAR(100),
    telefono_proveedor VARCHAR(20)
);

-- Tabla:  Decoradores
CREATE TABLE Decoradores (
    id_decorador INT PRIMARY KEY AUTO_INCREMENT,
    nombre_empresa VARCHAR(100),
    estilo_especialidad VARCHAR(100), -- ej. Vintage, Moderno, Temático
    precio_base DECIMAL(10,2),
    servicios_incluidos TEXT,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    url_portafolio VARCHAR(255)
);


-- Tabla: Categoria
CREATE TABLE Categoria (
    Nombre_Cat VARCHAR(100) PRIMARY KEY CHECK (
        Nombre_Cat IN (
            'Grupos Musicales',
            'Banquetes',
            'Salones de Eventos',
            'Mobiliario',
            'Decoradores'
        )
    ),
    id_grupo INT,
    id_banquete INT,
    id_salon INT,
    id_mobiliario INT,
    id_decorador INT,

    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_banquete) REFERENCES Banquetes(id_banquete)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_salon) REFERENCES Salones_Eventos(id_salon)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_mobiliario) REFERENCES Mobiliario(id_mobiliario)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_decorador) REFERENCES Decoradores(id_decorador)
        ON DELETE SET NULL ON UPDATE CASCADE
);

    

-- Tabla: Metodo_Pago
CREATE TABLE Metodo_Pago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    requiere_detalles BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Producto
CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(255),
    stock INT NOT NULL DEFAULT 0,
    Nombre_Cat VARCHAR(100),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (Nombre_Cat) REFERENCES Categoria(Nombre_Cat)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: Carrito
CREATE TABLE Carrito (
    id_carrito INT NOT NULL AUTO_INCREMENT,
    id_usuario INT,
    fecha_creado DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_metodo_pago INT,
    estatus ENUM('activo', 'pendiente', 'pagado', 'cancelado') DEFAULT 'activo',
    fecha_pago DATETIME,
    cuotas_credito INT,
    intervalo_cuotas VARCHAR(20),
    PRIMARY KEY (id_carrito),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_metodo_pago) REFERENCES Metodo_Pago(id_metodo_pago)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: Carrito_Detalle
CREATE TABLE Carrito_Detalle (
    id_detalle INT NOT NULL AUTO_INCREMENT,
    id_carrito INT,
    id_producto INT,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (id_carrito) REFERENCES Carrito(id_carrito)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabla: Pedido
CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_metodo_pago INT,
    estado ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    direccion_envio TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) DEFAULT 0.00,
    descuentos DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    notas TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_metodo_pago) REFERENCES Metodo_Pago(id_metodo_pago)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: Pedido_Detalle
CREATE TABLE Pedido_Detalle (
    id_detalle_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento_unitario DECIMAL(10,2) DEFAULT 0.00,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * (precio_unitario - descuento_unitario)) STORED,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
        ON DELETE SET NULL ON UPDATE CASCADE
);
-- Tabla: Orden (para facturación)
CREATE TABLE Orden (
    id_orden INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    numero_orden VARCHAR(50) NOT NULL UNIQUE,
    fecha_orden DATETIME DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'pagada', 'cancelada') DEFAULT 'pendiente',
    xml_factura TEXT,
    pdf_factura LONGBLOB,
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido)
        ON DELETE SET NULL ON UPDATE CASCADE
);
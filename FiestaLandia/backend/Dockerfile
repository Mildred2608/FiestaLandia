# Usa imagen oficial de Python
FROM python:3.11

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios primero (mejor caching)
COPY requirements.txt .

# Instala dependencias
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copia el resto del backend
COPY . .

# Expone el puerto donde correrá Django
EXPOSE 8000

# Comando para levantar el servidor de Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Usa imagen de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y lock primero
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código
COPY . .

# Exponer puerto (React usa 3000 por defecto)
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
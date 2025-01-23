# Usa una imagen base de Node.js en su versión 21-alpine3.19
FROM node:21-alpine3.19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y pnpm-lock.yaml al directorio de trabajo
COPY package.json ./
COPY pnpm-lock.yaml ./

# Instala pnpm y las dependencias del proyecto
# Nota: Añadimos la instalación de pnpm globalmente antes de usarlo para instalar dependencias
RUN npm install -g pnpm && pnpm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

RUN pnpm prisma generate

# Expone el puerto 54123
EXPOSE 54123

# Comando por defecto para ejecutar la aplicación (asegúrate de modificarlo según sea necesario)
#CMD ["npm", "start"]
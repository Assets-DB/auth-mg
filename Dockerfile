# Usa la imagen oficial de MongoDB
FROM mongo:5.0

# Copia el archivo de datos de prueba al contenedor
COPY ./data /data
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

# Exponemos el puerto 27017
EXPOSE 27017

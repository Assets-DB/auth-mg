# Usa la imagen oficial de MongoDB
FROM mongo:5.0

# Copia los archivos de datos de prueba al contenedor
COPY ./data /docker-entrypoint-initdb.d/data

# Copia el script de inicialización al directorio de inicialización de MongoDB
COPY ./init-mongo.js /docker-entrypoint-initdb.d/

# Configura MongoDB para usar un conjunto de réplicas
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]

# Exponemos el puerto 27017
EXPOSE 27017

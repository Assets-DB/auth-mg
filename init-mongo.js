rs.initiate();

// Esperar hasta que el conjunto de réplicas esté completamente inicializado
while (!db.isMaster().ismaster) {
    print("Esperando a que el conjunto de réplicas se inicialice...");
    sleep(1000);
}

// Seleccionar la base de datos, la creará si no existe
db = db.getSiblingDB('testdb'); 

// Cargar datos de prueba desde un archivo JSON
var client = JSON.parse(cat('/docker-entrypoint-initdb.d/data/User/client.json'));
var professional = JSON.parse(cat('/docker-entrypoint-initdb.d/data/User/professional.json'));

// Función para convertir _id de string a ObjectId
function convertToObjectId(doc) {
    if (doc._id && doc._id.$oid) {
        doc._id = ObjectId(doc._id.$oid);
        doc.last_login = new Date(doc.last_login.$date);
        doc.created_at = new Date(doc.created_at.$date);
        doc.updated_at = new Date(doc.updated_at.$date);
        doc.deleted_at = new Date(doc.deleted_at.$date);
    }
    return doc;
}

// Convertir el _id de cada documento en el array
client = client.map(convertToObjectId);
professional = professional.map(convertToObjectId);

// Insertar los datos en la colección llamada "user"
db.user.insertMany(client);
db.user.insertMany(professional);

print('Datos de prueba cargados');

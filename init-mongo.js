db = db.getSiblingDB('testdb'); // Selecciona la base de datos, la creará si no existe

// Carga datos de prueba desde un archivo JSON
var client = JSON.parse(cat('data/User/client.json'));
var professional = JSON.parse(cat('data/User/professional.json'));

// Función para convertir _id de string a ObjectId
function convertToObjectId(doc) {
    if (doc._id && doc._id.$oid) {
        doc._id = ObjectId(doc._id.$oid);
    }
    return doc;
}

// Convertir el _id de cada documento en el array
client = client.map(convertToObjectId);
professional = professional.map(convertToObjectId);

// Inserta los datos en la colección llamada "user"
db.user.insertMany(client);
db.user.insertMany(professional);

print('Datos de prueba cargados');

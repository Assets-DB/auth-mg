db = db.getSiblingDB('testdb'); // Selecciona la base de datos, la creará si no existe

// Carga datos de prueba desde un archivo JSON
var client = JSON.parse(cat('data/User/client.json'));
var professional = JSON.parse(cat('data/User/professional.json'));

// Inserta los datos en la colección llamada "User"
db.User.insertMany(client);
db.User.insertMany(professional);

print('Datos de prueba cargados');
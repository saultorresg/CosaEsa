const mysql = require('mysql2');

//Configurar la conexion con la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sangrael',
    password: 'warhammer',
    database: 'plasheras'
});

//Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos ', err );
        return;
    }
    console.log('Conexion establecida con exito');

    
});

module.exports = db;

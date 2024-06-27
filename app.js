const express = require('express');
const path = require('path');
const app = express();
const db = require('./JS/Databases/db');

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname)));

// Servir el archivo index.html en la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
});

app.get('/data', (req, res) => {
    const query = 'SELECT * FROM productos';
    db.query(query, (err,result) => {
        if (err) {
            console.error('Error al hacer la consulta ', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json(result);
    }); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});

module.exports = app;

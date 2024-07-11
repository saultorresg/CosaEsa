

const express = require('express');
const path = require('path');
const app = express();
const db = require('./JS/Databases/db');
const bodyParser = require('body-parser');
const authRoutes = require('./JS/auth/Routes')

app.use(express.json());

app.use('/auth', authRoutes);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname)));

// Servir el archivo index.html en la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'tienda.html'));
});

app.get('/canasta', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'canasta.html'));
});

app.get('/data', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        console.error('Error al hacer la consulta ', err);
        res.status(500).send('Error interno del servidor');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
    console.log(db);
});




module.exports = app;

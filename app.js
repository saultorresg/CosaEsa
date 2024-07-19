
const login = require('./JS/auth/auth')
const express = require('express');
const path = require('path');
const app = express();
const db = require('./JS/Databases/db');
const bodyParser = require('body-parser');
const authRoutes = require('./JS/auth/Routes')
const protectedR = require('./JS/auth/proy')

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoutes);
app.use('/protected', protectedR)

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname)));

// Servir el archivo index.html en la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'NavBar.html'));
});

app.get('/tienda', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'tienda.html'))
})

app.get('/canasta', (req, res) => {

    const id = req.query.id

    res.sendFile(path.join(__dirname, 'HTML', 'agregar_canasta.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'IniciarSesion.html'))
})

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, "HTML", "Registrarse.html"))
})

app.get('/data', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (err) {
        console.error('Error al hacer la consulta ', err);
        res.status(500).send('Error interno del servidor');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/check-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err.stack);
            res.status(500).json({ error: 'Error al ejecutar la consulta' });
        } else {
            res.json({ message: 'Conexión exitosa a la base de datos', solution: results[0].solution });
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
   
});




module.exports = app;

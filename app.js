
const login = require('./JS/auth/auth')
const express = require('express');
const path = require('path');
const app = express();
const db = require('./JS/Databases/db');
const bodyParser = require('body-parser');
const authRoutes = require('./JS/auth/Routes')
const protectedR = require('./JS/auth/proy');
const { log } = require('console');

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

app.get('/recuperar', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Recuperar_COntra.html'))
})

app.get('/compras', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Compras.html'))
})

app.post('/data', async (req, res) => {

    const { tipos, equipos } = req.body;

    if (!Array.isArray(tipos) || !Array.isArray(equipos)) {
        return res.status(400).json({ error: 'Tipos y equipos deben ser arrays' });
    }

    let values = [];
    let equiposCondition = '';
    let tiposCondition = '';

    try {
        let query = "SELECT * FROM productos";

        if (equipos.length > 0) {
            equiposCondition = equipos.map(() => 'equipo LIKE ?').join(' OR ');
            values.push(...equipos.map(equipo => `%${equipo}%`));
        }

        if (tipos.length > 0) {
            tiposCondition = tipos.map(() => 'tipo LIKE ?').join(' OR ');
            values.push(...tipos.map(tipo => `%${tipo}%`));
        }

        if (equiposCondition && tiposCondition) {
            query += ` WHERE (${equiposCondition}) AND (${tiposCondition})`;
        } else if (equiposCondition) {
            query += ` WHERE ${equiposCondition}`;
        } else if (tiposCondition) {
            query += ` WHERE ${tiposCondition}`;
        }

        console.log('SQL Query:', query);  // Imprime la consulta para depuración
        console.log('Values:', values);    // Imprime los valores para depuración

        const [rows] = await db.query(query, values);
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

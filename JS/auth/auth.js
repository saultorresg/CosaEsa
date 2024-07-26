
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Databases/db');
const { response } = require('express');

const register = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        const [rows] = await db.query('SELECT email FROM usuarios WHERE email = ?', [email]);

       
        if (rows.length > 0) {
            return res.status(400).json({ message: 'EL usuario ya existe'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(salt);
        console.log(hashedPassword);
        await db.query('INSERT INTO usuarios (name, email, password) VALUES (?,?,?)', [name,email, hashedPassword]);
        
        res.status(201).json({ message: 'Usuario registrado'});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
};  

const login = async (req, res) => {

    const { email, password } =  req.body;


    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({message: 'Credenciales invalidas'})
        } 

        const user = rows[0]
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Crendenciales invalidas'});
        } 

        const [row] = await db.query('SELECT id FROM canasta WHERE client_id = ?', [user.id])
        const canasta = row[0]

        const payload = {
            userId: user.id,
            userName: user.name,
            canastaId: canasta.id,
            pepe: 'pepe'
        }

        const token = jwt.sign(payload, 'mysecretkey', {expiresIn: '1h'});
        
        const decode = jwt.decode(token)
        res.status(200).json({ token });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

const ingresar_producto_canasta = async (req, res) => {

    const { cantidad, id_canasta, id_producto } = req.body;

    try {
        
        const row = await db.query('INSERT INTO canasta_productos (cantidad, id_producto, id_canasta)  (?, ?, ?)', [cantidad, id_producto, id_canasta] )
        
        res.status(200).json({row})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const mostrar_canasta = async (req, res) => {

    const { id } = req.body;

    try {
        const [rows, fields] = await db.query('SELECT * FROM canasta_productos WHERE id_canasta = ?', [id])
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en la canasta.' });
        }
        
        console.log(rows);
        res.status(200).json({rows})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

const obtener_producto = async (req, res) => {

    const { id } = req.body;

    try {
        
        const producto = await db.query('SELECT * FROM productos WHERE id = ?', [id] )
        console.log(producto);
        res.status(200).json({producto})

    } catch (error) {
        console.log(error);        
    }
}

const modificar_cantidad = async (req, res) => {

    const { cantidad, id } = req.body

    try {
        
        const modifcacion = await db.query('UPDATE canasta_productos SET cantidad = ? WHERE id = ?', [cantidad, id])
        res.status(200).json({modifcacion})
    } catch (error) {
        console.log(error);
    }
}

const eliminar_producto_canasta = async (req, res) => {

    const { id } = req.body

    try {
        
        const eliminar = await db.query('DELETE FROM canasta_productos WHERE id = ?', [id])
        res.status(200).json({eliminar})
    } catch (error) {
        console.log(error);
    }
}

const cerrar_sesion = async (req, res) => {

    const { token } = req.body

    jwt.verify(token, 'mysecretkey', (err, decode) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token ha expirado
                return res.status(401).json({ message: 'Token expirado' });
            }
            // Otros errores de token
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decode
    })

    res.status(500).json({message: 'Se cerro'})
}

module.exports = { cerrar_sesion, eliminar_producto_canasta, modificar_cantidad, register, login, ingresar_producto_canasta, mostrar_canasta, obtener_producto };
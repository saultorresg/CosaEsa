
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Databases/db');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    try {
        const [rows] = await db.query('SELECT email FROM usuarios WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'EL usuario ya existe'});
        }

        console.log(name);
        console.log(email);
        console.log(password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query('INSERT INTO usuarios (name, email, password) VALUES (?,?,?)', [name,email, hashedPassword]);
        
        res.status(201).json({ message: 'Usuario registrado'});

    } catch (error) {
        
        res.status(500).json({message: 'Server error'});
    }
};

const login = async (req, res) => {

    const { email, password } = req.body;


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
    ;
        const payload = { user: { id: user.id}};
        const token = jwt.sign(payload, 'mysecretkey', {expiresIn: '1h'});
        //sessionStorage.setItem('authToken', token)
        const decode = jwt.decode(token)
        console.log(decode);
        res.status(200).json({ token });
    } catch (error) {
        
        res.status(500).json({ message: error.message});
    }
}

module.exports = { register, login };
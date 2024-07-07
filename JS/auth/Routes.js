const express = require('express');
const router = express.Router();
const { register, login, ingresar_producto_canasta } = require('./auth');

router.post('/register', register);
router.post('/login', login);
router.post('/agregar', ingresar_producto_canasta)

module.exports = router;
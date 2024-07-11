const express = require('express');
const router = express.Router();
const { register, login, ingresar_producto_canasta, mostrar_canasta, obtener_producto } = require('./auth');

router.post('/register', register);
router.post('/login', login);
router.post('/agregar', ingresar_producto_canasta)
router.get('/mostrar', mostrar_canasta)
router.post('/producto', obtener_producto)

module.exports = router;
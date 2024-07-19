const express = require('express');
const router = express.Router();
const { eliminar_producto_canasta, modificar_cantidad, register, login, ingresar_producto_canasta, mostrar_canasta, 
    obtener_producto } = require('./auth');

router.post('/register', register);
router.post('/login', login);
router.post('/agregar', ingresar_producto_canasta)
router.post('/mostrar', mostrar_canasta)
router.post('/producto', obtener_producto)
router.post('/modificar', modificar_cantidad)
router.post('/eliminar', eliminar_producto_canasta)




module.exports = router;
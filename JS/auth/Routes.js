const express = require('express');
const router = express.Router();
const { obtener_tipoProducto, obtener_Compras, demostrar_like,dar_like,cerrar_sesion,eliminar_producto_canasta, modificar_cantidad, register, login, ingresar_producto_canasta, mostrar_canasta, 
    obtener_producto } = require('./auth');

router.post('/register', register);
router.post('/loginar', login);
router.post('/agregar', ingresar_producto_canasta)
router.post('/mostrar', mostrar_canasta)
router.post('/producto', obtener_producto)
router.post('/modificar', modificar_cantidad)
router.post('/eliminar', eliminar_producto_canasta)
router.post('/cerrar', cerrar_sesion)
router.post('/like', dar_like)
router.post('/getLike', demostrar_like)
router.post('/compras', obtener_Compras)
router.post('/tipoProducto', obtener_tipoProducto)




module.exports = router;
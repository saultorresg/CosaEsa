
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../Databases/db');
const { response } = require('express');

const register = async (req, res) => {
    const { apodo, nombre, apellidoP, apellidoM, email, password, fechaNa} = req.body;


    try {
        const [rows] = await db.query('SELECT email FROM usuario WHERE email = ?', [email]);

       
        if (rows.length > 0) {
            return res.status(400).json({ message: 'EL usuario ya existe'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(salt);
        console.log(hashedPassword);
        await db.query('INSERT INTO usuario (name, email, password, Activo, Nombres, ApellidoPrimero, ApellidoSegundo, fechaNacimiento) VALUES (?,?,?,?,?,?,?,?)', [apodo, email, hashedPassword, 1, nombre, apellidoP, apellidoM, fechaNa]);
        
        res.status(201).json({ message: 'Usuario registrado'});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'});
    }
};  

const login = async (req, res) => {

    const { email, password, userAgent } =  req.body;


    try {
        const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);


        if (rows.length === 0) {
            return res.status(400).json({message: 'Credenciales invalidas'})
        } 

        const user = rows[0]
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Crendenciales invalidas'});
        } 

        const [row] = await db.query('SELECT id FROM canasta WHERE usuario_id = ?', [user.id])
        const canasta = row[0]

        const payload = {
            userId: user.id,
            userName: user.name,
            canastaId: canasta.id,
            pepe: 'pepe'
        }

        const name = user.name
        const token = jwt.sign(payload, 'mysecretkey', {expiresIn: '1h'});
    
     

        await db.query('INSERT INTO sesion (idUsuario, navegador) VALUES (?,?)', [user.id,userAgent])
        const [sesion] = await db.query('SELECT id FROM sesion WHERE idUsuario = ? ORDER BY horaInicio DESC LIMIT 1', [user.id])
        const set = sesion[0]
        console.log(set.id);
        const [tokens] = await db.query('INSERT INTO tokens (token, sesionid) VALUES (?,?)', [token, set.id] )
       
        
        const decode = jwt.decode(token)
        res.status(200).json({ set, name });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: error.message});
    }
}

const ingresar_producto_canasta = async (req, res) => {

    const { cantidad, id, id_producto, numero, nombre, precio, talla } = req.body;

    console.log('numero: ' + numero);
    console.log('nombre: ' + nombre);
    console.log('talla: ' + talla);
    console.log('cantidad: ' + cantidad);
    console.log('idSesion: ' + id);
    console.log('precio: ' + precio);
    console.log('idProducto: ' + id_producto);
    
    
    

    const total = parseFloat(precio) - parseFloat((precio / 1.16))
    let message = ''

    try {

        numero.forEach(async (element, indice) => {

            console.log(element);
            console.log(nombre[indice]);
            console.log(talla[indice]);

            const [sesion] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [id])

            const [canasta] = await db.query('SELECT id FROM canasta WHERE usuario_id = ?', [sesion[0].idUsuario])
            console.log('id canasta: ' + canasta[0].id);
            
            const id_canasta = canasta[0].id
            const [row] = await db.query('INSERT INTO canasta_productos (cantidad, id_producto, id_canasta, precio, total, iva, id_medida, numero, etiqueta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [cantidad / numero.length, id_producto, id_canasta, precio / 1.16, precio ,  total, talla[indice], element, nombre[indice]] )
            
                console.log(row);
                console.log(row.affectedRows);
                if (row.affectedRows == 1) {
                    message = 'ok'
                } 

            /*if (element.length > 0 && nombre.length > 0) {   
                
                const personalizda = await db.query('INSERT INTO playera_personalizada (numero, nombre, canastapid) VALUES (?,?,?)', [element, nombre[indice], row.insertId])
            }*/
        })

       
        res.status(200).json({message: message})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const mostrar_canasta = async (req, res) => {

    const { id } = req.body;
    console.log(id);

    try {

        const [sesion] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [id])
        console.log(sesion[0].idUsuario);
        const [canasta] = await db.query('SELECT id FROM canasta WHERE usuario_id = ?', [sesion[0].idUsuario])
        console.log(canasta[0].id);
        const [rows, fields] = await db.query('SELECT * FROM canasta_productos WHERE id_canasta = ?', [canasta[0].id])
        console.log('canasta');
        
        console.log(rows);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en la canasta.' });
        }
        
        res.status(200).json({rows})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

const obtener_tipoProducto = async(req, res)=>{
    const { idProducto } = req.body;
    console.log("auth.js-obtener_tipoProducto-idProducto:" + idProducto);

    try{
        const [tipoProducto] = await db.query('SELECT p1.* FROM producto p1 inner join  producto p2 On p2.idtipo = p1.idTipo And p2.id <> p1.id  And p2.id = ? Order by p1.precio asc limit 5', [idProducto] )

        console.log(tipoProducto);
        res.status(200).json({tipoProducto})

    } catch (error) {
        console.log(error);        
    }

}

const obtener_producto = async (req, res) => {

    const { id } = req.body;

    try {
        
        const producto = await db.query('SELECT * FROM producto WHERE id = ?', [id] )
        console.log(producto[0][0].idTipo);

        switch (producto[0][0].idTipo) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 9:
                const [pMedidas] = await db.query('SELECT * FROM productomedidas WHERE idProducto = ? ', [id])
                console.log('Medidas');
                let idMedidas = []

                pMedidas.forEach(element => {

                    idMedidas.push(element.idMedida)
                    console.log(element);
                    
                })

                //const [medidas] = await db.query('SELECT * FROM medida WHERE id IN (?)', [idMedidas])
                res.status(200).json({producto})
                break;
        
            default:

                res.status(200).json({producto})

                break;
        }

        

    } catch (error) {
        console.log(error);        
    }
}

const modificar_cantidad = async (req, res) => {

    const { cantidad, id } = req.body

    try {
        
        console.log(cantidad, id);
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

const obtener_nombre = async (req, res) => {

    const { id } = req.body

    const nombre = await db.query('SELECT token FROM tokens')
}

const dar_like = async (req, res) => {

    const { number, sesion, estado } = req.body

    console.log("dar_like:", number, sesion, estado);

    try {

        
        if(sesion!=null){
            const [idUsuario] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
            if (estado == 0) {
                const [row] = await db.query('INSERT INTO productousuario (idProducto, idUsuario) VALUES (?,?)', [number, idUsuario[0].idUsuario])
                console.log(row);
            } else {
                const [row] = await db.query('DELETE FROM productousuario WHERE idUsuario = ? AND idProducto = ?', [idUsuario[0].idUsuario, number])
                console.log(row);
            }
            res.status(500).json({row})
        } else {
            res.status(200).json({message:'¡No esta registrado!'})
        }
    } catch (error) {
        console.log(error);
    }

}

const demostrar_like = async (req, res) => {

    const { number, sesion } = req.body

    try {
        
        const [idUsuario] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        const [row] = await db.query('SELECT * FROM productousuario WHERE idUsuario = ? AND idProducto = ?', [idUsuario[0].idUsuario, number])
        
        if (row.length > 0) {
            console.log(row);
            res.status(500).json({row})
        } else {
            res.status(500).json({})
        }
    } catch (error) {
        console.log(error);
    }
}

const obtener_Compras = async(req, res)=>{
    const { idSesion } = req.body;
    console.log("auth.js-obtener_Compras-idSesion:" + idSesion);

    try{
        const [compraProducto] = await db.query(`SELECT p.id, v2.noPedido, v.fechaAlta, p.descripcion, v.total, v.estadoEnvio FROM ventadetalle v 
            JOIN producto p ON p.id = v.idProducto 
            JOIN venta v2 ON v.idVenta = v2.id 
            JOIN cliente c ON c.id = v2.idCliente 
            JOIN usuario u ON u.id = c.idUsuario 
            JOIN sesion s ON s.idUsuario = u.id
            WHERE  s.id = ?`, [idSesion] )

            console.log(compraProducto);
        res.status(200).json({compraProducto})

    } catch (error) {
        console.log(error);        
    }

}

const registrar_cliente = async (req, res) => {

    const {
        sesion,
        nombre,
        primerApellido,
        segundoApellido,
        calle,
        numExterior,
        numInterior,
        colonia,
        codigo,
        municipio,
        entidad,
        pais,
        card,
        fecha
    } = req.body

    try {
        const [idUsuario] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        console.log(idUsuario[0]?.idUsuario);
        
        const [row] = await db.query('CALL actualizarCliente (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
        [idUsuario[0]?.idUsuario, nombre, primerApellido, segundoApellido, calle, numExterior, numInterior, colonia, codigo, municipio, entidad, pais, card, fecha])
       
        console.log(fecha);
        
        console.log(row);
        
        res.status(200).json({row})
    } catch (error) {
        console.log(error);
    }
}

const guardar_metodos = async (req, res) => {

    const { numbers, dateE, cod, name, sesion } = res.body

    try {
        
        const idUsuario = db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        const [row] = db.query('INSERT INTO metodos_pago (idUsuario, cardNumber, fechaExpiracion)')

        console.log(row);

        res.status(200).json({row})
        

    } catch (error) {
        
    }
}

const cantidad_cesta = async (req, res) => {

    const  sesion  = req.query.sesion
    console.log(sesion);
    

    try {
        
        const idUsuario = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        const idCanasta = await db.query('SELECT id FROM canasta WHERE usuario_id = ?', [idUsuario[0][0].idUsuario])
        const [row] = await db.query('SELECT COUNT(*) AS cantidad FROM canasta_productos WHERE id_canasta = ?', [idCanasta[0][0].id])
        
        res.json(row)

    } catch (error) {
        console.log(error);
        
    }
}

const cliente_existe = async (req, res) => {

    const sesion = req.query.sesion

    try {
        const idUsuario = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        const [row] = await db.query('SELECT EXISTS ( SELECT 1 FROM cliente WHERE idUsuario = ?) AS EXISTE', [idUsuario[0][0].idUsuario])

        console.log(sesion);
        console.log(idUsuario);

        if (row[0].EXISTE == 1) {
            
            const [cliente] = await db.query('SELECT * FROM cliente WHERE idUsuario = ?', [idUsuario[0][0].idUsuario])
            const [metodo] = await db.query('SELECT * FROM metodos_pago WHERE idUsuario = ?', [idUsuario[0][0].idUsuario])
            console.log(cliente);
            console.log(typeof(metodo[0].cardNumber));
            const procesado = {
                card: metodo[0].cardNumber.slice(0, 4),
                fecha: metodo[0].fechaExpiracion
            }
            res.json({row, cliente, procesado})
        } else {

            res.json(row)
        }
        

    } catch (error) {
        console.log(error);
        
    }

}

const verificarContra = async (req, res) => {

    const contra = req.query.pass
    const sesion = req.query.sesion
    console.log(sesion);
    

    try {
        const [idUsuario] = await db.query('SELECT idUsuario FROM sesion WHERE id = ?', [sesion])
        console.log(idUsuario);
        
        const [row] = await db.query('SELECT password FROM usuario WHERE id = ?', [idUsuario[0].idUsuario])

        console.log(contra);
        console.log(row[0].password);

        bcrypt.compare(contra, row[0].password, function (err, result) {
            
            if (err) {

            } else if (result) {
                console.log('contraseña correcta');
                res.json(true)
                
            } else {
                res.json(false)
            }
        })

        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = { verificarContra, cliente_existe, cantidad_cesta, guardar_metodos, registrar_cliente, obtener_tipoProducto, obtener_Compras, demostrar_like, dar_like, cerrar_sesion, eliminar_producto_canasta, modificar_cantidad, register, login, ingresar_producto_canasta, mostrar_canasta, obtener_producto };
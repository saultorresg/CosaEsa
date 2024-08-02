


const params = new URLSearchParams(window.location.search)
const id = params.get('id')

console.log(id);

var  contador = 1
const label_contador = document.querySelector('.label-cantidad')
label_contador.innerText = contador

async function Obtener_producto() {
    
    try {

        const response = await fetch('/auth/producto', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        const data = await response.json();

        console.log(data);
        console.log(data.medidas);
        Mostrar_Producto(data)
        document.dispatchEvent(new Event('codigoTerminado'));

    } catch (error) {
        console.log(error);
    }
    
}

function Mostrar_Producto(data) {

    const producto = data.producto[0][0]

    const label_nombre = document.getElementById('label-nombre')
    const label_precio = document.getElementById('label-precio')

    label_nombre.innerText = producto.descripcion
    label_precio.innerText = producto.precio;

    const btn_agregar = document.querySelector('.btn_pedido')
    btn_agregar.innerText = 'Agregar al carrito - Total ' + producto.precio

    const images = document.querySelectorAll('.img-principal')

    images.forEach(element => {
        element.src='../IMAGES/articulos/art' + producto.idTipo + '.png'
    })

    /*const label_descripcion = document.getElementById('label-descripcion')
    label_descripcion.innerHTML = producto.descripcion*/

    if (data.medidas) {
        
        Mostrar_Medidas(data.medidas)
    }

    if (producto.idTipo != 9) {
        
        const divPersonalizar = document.getElementById('personalizar')
        divPersonalizar.remove()
    }
}

function Contador(boton) {

    
    if (boton.value == '+') {
        
        contador+=1
    } else if (boton.value == '-' && contador != 1) {
        
        contador-=1
    }

    label_contador.textContent = contador
    AgregarCollapse(contador)
}

function parseJwts (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function Mostrar_Medidas(medidas) {
    
    console.log(medidas);
    const contenedor_tallas = document.getElementById('tallas')

    console.log(contenedor_tallas);


    medidas.forEach(element => {

        console.log(element);
        const btn = document.createElement('input')
        btn.type = 'radio'
        btn.name = 'tallas'
        btn.id = 'btnradio' + element.id
        btn.classList.add('btn-check')

        const lbl = document.createElement('label')
        lbl.innerText = element.nombre
        lbl.setAttribute('for', 'btnradio' + element.id)
        lbl.classList.add('btn', 'btn-outline-primary')

        contenedor_tallas.appendChild(btn)
        contenedor_tallas.appendChild(lbl)
    })
    
}

function AgregarCollapse(contador) {

    if (contador != 1) {
        
        const seccion = document.querySelector('.sectProducto')
        const conte = document.querySelector('#contenedor_personalizar')
        const nuevo = seccion.cloneNode(true)

        console.log(nuevo);

        const a = nuevo.querySelector('.btn-primary')
        a.setAttribute('href' , '#collapseExample' + contador)

        const collapse = nuevo.querySelector('#collapseExample')
        collapse.id = "collapseExample" + contador

        btns = nuevo.querySelectorAll('input')
        lbls = nuevo.querySelectorAll('label')

        btns.forEach((element, indice) => {

            element.name = "tallas" + contador
            element.id += contador
            try {
                
                lbls[indice].setAttribute('for', '' + element.id)
            } catch (error) {
                
            }
            console.log(lbls[indice]);
            console.log(element);
        })

        conte.appendChild(nuevo)
    }
}

Obtener_producto()


const token = sessionStorage.getItem('authToken')

//const traduccion = parseJwts(token)

//console.log(traduccion);

const btn_ingresar = document.getElementById('btn-ingresar')

//btn_ingresar.innerText = traduccion.user.name


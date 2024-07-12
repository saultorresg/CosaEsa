


const params = new URLSearchParams(window.location.search)
const id = params.get('id')

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
        Mostrar_Producto(data.producto[0][0])

    } catch (error) {
        console.log(error);
    }
    document.dispatchEvent(new Event('codigoTerminado'));
}

function Mostrar_Producto(producto) {

    const label_nombre = document.getElementById('label-nombre')
    const label_precio = document.getElementById('label-precio')

    label_nombre.innerText = producto.nombre;
    label_precio.innerText = producto.costo;

    const btn_agregar = document.getElementById('btn-agregar')
    btn_agregar.innerText = 'Agregar al carrito - Total ' + producto.costo

    const label_descripcion = document.getElementById('label-descripcion')
    label_descripcion.innerHTML = producto.descripcion

    btn_agregar.addEventListener('click', function () {
        

    })
}

function Contador(boton) {
    
    if (boton.value == '+') {
        
        contador+=1
    } else if (boton.value == '-' && contador != 1) {
        
        contador-=1
    }

    label_contador.value = contador
}

function parseJwts (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

Obtener_producto()


const token = sessionStorage.getItem('authToken')

const traduccion = parseJwts(token)

console.log(traduccion);

const btn_ingresar = document.getElementById('btn-ingresar')

btn_ingresar.innerText = traduccion.user.name
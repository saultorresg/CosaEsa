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

    console.log(producto);

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

Obtener_producto()
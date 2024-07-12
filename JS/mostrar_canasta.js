async function inicio() {

    const token = sessionStorage.getItem('authToken')
    const traduccion = parseJwt(token)
    const id_canasta = parseInt(traduccion.user.id_canasta)

    console.log(typeof(id_canasta));

    console.log(id_canasta);

    try {
        
        const response = await fetch('/auth/mostrar', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id_canasta})
        })
        const data = await response.json()
        console.log(data);
        Obtener_datos(data.id_producto)

    } catch (error) {
        console.log(error);
    }
}

async function Obtener_datos(id) {
    
    console.log(id);

    try {

        const response = await fetch('/auth/producto', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        const data = await response.json();
        Crear_card(data.producto)
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

function Crear_card(producto) {
    
    console.log(producto[0]);

    const columna_datos = document.createElement('div')
    columna_datos.classList.add('col', 'md-8')

    const card_body = document.createElement('div')
    card_body.classList.add('card-body')

    const btns = document.createElement('div')
    btns.classList.add('border', 'rounded', 'border-warning', 'border-2')

    const card_title = document.createElement('h5')
    card_title.classList.add('card-title')
    card_title.innerText = producto.producto[0].nombre

    const precio = document.createElement('p')
    precio.classList.add('card-text')
    precio.innerText = producto.producto[0].costo

    const div_buttons = document.createElement('div')
    const btn_mas = document.createElement('button')
    const label_cantidad = document.createElement('label')
    const btn_menos = document.createElement('button')

    btn_mas.classList.add('btn')
    btn_menos.classList.add('btn')

    label_cantidad.innerText = 'pepe'
    
    const div = document.querySelector('.col-md-4')
    div.append()
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}
    inicio()


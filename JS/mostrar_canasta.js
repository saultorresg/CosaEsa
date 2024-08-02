async function inicio() {
    
    const btn = document.getElementById('btn-canasta')

    btn.addEventListener('click', async function() {

        const columna = document.getElementById('columna')
        columna.innerHTML = ''
        
        const id = localStorage.getItem('sesion')

        try {
            
            const response = await fetch('/auth/mostrar', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
            const data = await response.json()
            data.rows.forEach(element => {
                console.log(element);
                Obtener_datos(element.id_producto, element.cantidad, element.id)
            });
            console.log(data.rows);
            //Obtener_datos(data.rows[0].id_producto ,data.rows[0].cantidad)

        } catch (error) {
            console.log(error);
        }
    })

    
}

async function Obtener_datos(id, cantidad, idCanasta) {
    

    try {

        const response = await fetch('/auth/producto', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        const data = await response.json();
        console.log(data.producto[0][0]);
        Crear_card(data.producto, cantidad, idCanasta)

    } catch (error) {
        console.log(error);
    }
}

function Crear_card(producto, cantidad, idCanasta) {

    console.log(producto[0][0]);

    const column_img = document.createElement('div')
    column_img.classList.add('col-md-4')

    const img = document.createElement('img')
    img.classList.add('img-fluid', 'rounded-start')
    img.setAttribute('style', 'max-width:180px')
    img.src = '../IMAGES/kirbo.png'

    column_img.appendChild(img)

    const columna_datos = document.createElement('div')
    columna_datos.classList.add('col-md-7')

    const card_body = document.createElement('div')
    card_body.classList.add('card-body', 'txt_carta_carrito')

    const card_title = document.createElement('h5')
    card_title.classList.add('card-title')
    card_title.innerText = producto[0][0].descripcion

    const precio = document.createElement('p')
    precio.classList.add('card-text')
    precio.innerText = producto[0][0].precio

    const div_acciones = document.createElement('div')

    const btnBorrar = document.createElement('button')
    btnBorrar.id = 'btn-borrar'
    btnBorrar.innerText = 'Borrar'
    btnBorrar.setAttribute('onclick','BorrarProducto(this)')
    btnBorrar.setAttribute('elej', idCanasta)

    div_acciones.appendChild(btnBorrar)

    if (producto[0][0].id_medida != 7) {
        
        
    }

    const div_buttons = document.createElement('div')
    div_buttons.classList.add('border', 'rounded', 'border-warning', 'border-2')

    const btn_mas = document.createElement('button')
    const label_cantidad = document.createElement('button')
    const btn_menos = document.createElement('button')

    btn_mas.classList.add('btn')
    btn_mas.setAttribute('tipo', producto[0][0].id)
    btn_mas.setAttribute('elej', idCanasta)
    btn_mas.textContent = '+'
    btn_mas.setAttribute('onClick' , 'AumentarDisminuir(this)')
    btn_menos.classList.add('btn')
    btn_menos.setAttribute('tipo', producto[0][0].id)
    btn_menos.setAttribute('elej', idCanasta)
    btn_menos.textContent = '-'
    btn_menos.setAttribute('onClick' , 'AumentarDisminuir(this)')

    label_cantidad.innerText = cantidad
    label_cantidad.classList.add('btn')
    label_cantidad.setAttribute('tipos', producto[0][0].id)
    label_cantidad.disabled
    
    div_buttons.appendChild(btn_menos)
    div_buttons.appendChild(label_cantidad)
    div_buttons.appendChild(btn_mas)

    card_body.appendChild(card_title)
    card_body.appendChild(precio)
    card_body.appendChild(div_acciones)
    card_body.appendChild(div_buttons)

    columna_datos.appendChild(card_body)

    columna_check = document.createElement('div')
    columna_check.classList.add('col-md-1')

    chk = document.createElement('input')
    chk.type = 'checkbox'

    columna_check.appendChild(chk)

    const orientacion = document.createElement('div')
    orientacion.classList.add('row', 'g-0')

    orientacion.appendChild(column_img)
    orientacion.appendChild(columna_datos)
    orientacion.appendChild(columna_check)

    const card = document.createElement('div')
    card.classList.add('card')
    card.appendChild(orientacion)

    const columna = document.getElementById('columna')
    console.log(columna);
    console.log(card);
    columna.appendChild(card)
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
    inicio()


function inicio() {
    
    fetch('/auth/mostrar')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(elemento => {

                Obtener_datos(elemento.id_producto)
                //Crear_card(elemento)
            })
        })
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
    
}

window.addEventListener('sessionStorageChange', (event) => {

    inicio()
})

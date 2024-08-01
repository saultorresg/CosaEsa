

let arrayPrincipal = []
function obtener_productis(tipos, equipos, stock) {

    arrayPrincipal = []
    var contador = 0
    var arrauNuevo = []

    console.log(stock);
    
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tipos, equipos, stock})
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(async (element, indice) => {

                contador += 1



                const card = document.createElement('div')
                card.href = '/canasta?id=' + element.id 
                card.classList.add('carta')

                const img = document.createElement('img')
                img.classList.add('img_carta', 'img-fluid')
                img.src = '../IMAGES/articulos/art' + element.idTipo + '.png'

                const card_body = document.createElement('div')
                card_body.classList.add('txt_carta')

                const label_name = document.createElement('a')
                label_name.href = '/canasta?id=' + element.id
                label_name.innerText = element.descripcion

                const card_footer = document.createElement('div')
                card_footer.classList.add('txt_carta_2')

                const label_costo = document.createElement('a')
                label_costo.innerText = element.precio

                const lbl = document.createElement('label')
                lbl.classList.add('container')
//dede
                const chkbox_deseo = document.createElement('input')
                chkbox_deseo.type = 'checkbox'
                chkbox_deseo.setAttribute('number', element.id)
                chkbox_deseo.setAttribute('onchange', 'DarLike(this)')
                chkbox_deseo.classList.add('productos')

                /*if (localStorage.getItem('sesion')) {

                    const sesion = localStorage.getItem('sesion')
                    const number = element.id

                    console.log(number);
                    console.log(sesion);

                    try {
                        
                        const response = await fetch('/auth/getLike', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ number, sesion })
                        })

                        const data = await response.json()

                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }
                }*/

                const svgContent = `
                    <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                `;

                lbl.appendChild(chkbox_deseo)
                lbl.innerHTML += svgContent

                card_footer.appendChild(label_costo, chkbox_deseo)
                card_footer.appendChild(lbl)

                card_body.appendChild(label_name)
                card_body.appendChild(card_footer)

                card.appendChild(img)
                card.appendChild(card_body)
                card.setAttribute('tipo', element.idTipo)
                card.setAttribute('equipo', element.idEquipo)

                if (contador == 12) {

                    arrauNuevo.push(card)
                    arrayPrincipal.push(arrauNuevo)
                    contador = 0
                    arrauNuevo = []

                } else {

                    arrauNuevo.push(card)
                }

            })
            arrayPrincipal.push(arrauNuevo)
            ImprimirProductos(arrayPrincipal, 0)

        })
}

function ImprimirProductos(array, numero) {



    const container = document.getElementById('grupo_cartas')
    const pagination = document.getElementById('pag')

    container.innerHTML = ''
    pagination.innerHTML = ''
    
    array.forEach((element, indice) => {

        if (indice == numero) {
            
            element.forEach(element => {

                container.appendChild(element)
            })
        }

        const lista = document.createElement('li')
        lista.classList.add('page-item')

        const button = document.createElement('button')
        button.classList.add('page-link')
        button.textContent = indice + 1
        button.onclick = function () {
            
            CambiarPagina(this)
        }
        lista.appendChild(button)

        pagination.appendChild(lista)

        localStorage.setItem('indice', numero)

        EjecutarScripts()
    })
}

async function EjecutarScripts() {
    
    await Poner_Likes('../JS/Poner_Likes.js')
}

function CambiarPagina(boton) {
    
    
    
    if (boton.childNodes.length != 1) {

        const indice = parseInt(localStorage.getItem('indice'))
        
        if (boton.childNodes[1].textContent === '»' && (arrayPrincipal.length - 1) != indice ) {
        

            ImprimirProductos(arrayPrincipal, indice + 1 )
        } else if (boton.childNodes[1].textContent === '«' && indice != 0) {
            
            ImprimirProductos(arrayPrincipal, indice - 1 )          
        } 
    } else {

        ImprimirProductos(arrayPrincipal, parseInt(boton.textContent)-1)
    }

        
 } 

function FiltrarDatos(buton) {

    var arrayEquipos = []
    const arrayTipos = []
    var arrayStocks = []
    var arrayFiltrado = []

    const filtros = document.querySelectorAll('input[type="checkbox"]:checked')

    console.log(buton.classList[1]);

    if (buton.classList[1] == 'equipos') {
        
        arrayEquipos.push(buton.getAttribute('value'))
    }
    
    filtros.forEach(chk => {

        let existe = arrayEquipos.filter(item => item == chk.value). length > 0
        
        if (chk.classList == 'equipos' && !existe) {
            
            arrayEquipos.push(chk.value)

        } else if (chk.classList == 'tipo') {
            
            arrayTipos.push(chk.value)

        } 
        
        if (chk.classList == 'stock') {

            arrayStocks.push(chk.value)
        }
    })

    obtener_productis(arrayTipos, arrayEquipos, arrayStocks)

}

async function DarLike(boton) {
    
    const number =  boton.getAttribute('number')
    const sesion = localStorage.getItem('sesion')

    try {
        
        const response = await fetch('/auth/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number,  sesion})
        })

        const data = await response.json()
        
        if (data.ok) {
            console.log('To salio bien');
        }

    } catch (error) {
        console.log(error);
    }
}

arrayTipo = []
arrayEquipo = []
arrayStock = []

window.addEventListener('DOMContentLoaded', (event) => {
    obtener_productis(arrayTipo, arrayEquipo, arrayStock)
})

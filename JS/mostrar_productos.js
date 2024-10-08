

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
                console.log(element);

                //Carta para mostrar los productos
                const card = document.createElement('div')
                card.href = '/canasta?id=' + element.id 
                card.classList.add('carta')

                //Contenedor estado del producto
                const div_estado = document.createElement('div')
                div_estado.classList.add('carta_estado')

                const linea = document.createElement('a')

                if (element.estado == 0) {
                     linea.innerText = 'Preventa'
                } else if (element.estado  == 1) {
                    
                     linea.innerText = 'En Stock'
                } else {

                     linea.innerText = 'Agotdo'
                }

                div_estado.appendChild(linea)

                //Imagen del producto
                const img = document.createElement('img')
                img.classList.add('img_carta')
                img.src = '../IMAGES/articulos/' + element.id + '.png'

                //Parte texto de la carta
                const card_body = document.createElement('div')
                card_body.classList.add('txt_carta')

                //Contenedor del nombre
                const contenedor_nombre = document.createElement('div')
                contenedor_nombre.classList.add('txt_carta_1')

                const label_name = document.createElement('a')
                label_name.href = '/canasta?id=' + element.id
                label_name.innerText = element.descripcion

                contenedor_nombre.appendChild(label_name)

                //Contenedor del precio y like
                const card_footer = document.createElement('div')
                card_footer.classList.add('txt_carta_2')

                const label_costo = document.createElement('a')
                label_costo.innerText = element.precio

                //Like en forma  de corazon
                const lbl = document.createElement('label')
                lbl.classList.add('container_corazon')

                const chkbox_deseo = document.createElement('input')
                chkbox_deseo.type = 'checkbox'
                chkbox_deseo.setAttribute('number', element.id)
                chkbox_deseo.setAttribute('onchange', 'DarLike(this)')
                chkbox_deseo.classList.add('productos')

                const svgContent = `
                    <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                `;

                lbl.appendChild(chkbox_deseo)
                lbl.innerHTML += svgContent

                card_footer.appendChild(label_costo)
                card_footer.appendChild(lbl)

                card_body.appendChild(label_name)
                card_body.appendChild(card_footer)

                card.appendChild(div_estado)
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

        const button = document.createElement('a')
        button.classList.add('pag_num')
        button.textContent = indice + 1
        if (indice == numero) {
            button.classList.add('selected')
        }
        button.onclick = function () {
            
            CambiarPagina(this)
        }
        pagination.appendChild(button)

        localStorage.setItem('indice', numero)
        button.classList.add

        EjecutarScripts()
    })


}

async function EjecutarScripts() {
    
    await Poner_Likes('../JS/Poner_Likes.js')
}

function CambiarPagina(boton) {
    
    console.log(boton.childNodes);
    const paginas = document.querySelectorAll('.pag_num')
    const paginasArray = Array.from(paginas)
    console.log(paginas);
    console.log(paginasArray);
    
    const pagina = document.querySelector('.selected')
    console.log(pagina);
    
    const indi = paginasArray.indexOf(pagina)
    
    if (boton.childNodes.length != 1) {

        console.log('Hola');
        
        const indice = parseInt(localStorage.getItem('indice'))
        
        if (boton.getAttribute('aria-label') == 'Next' && (arrayPrincipal.length - 1) != indice ) {
        
            paginas
            ImprimirProductos(arrayPrincipal, indice + 1 )
            
        } else if (boton.getAttribute('aria-label') == 'Previous' && indice != 0) {
            
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
    let estado 
    

    if (boton.checked) {
        estado = 0
    } else {
        estado = 1
    }

    try {
        
        const response = await fetch('/auth/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number,  sesion, estado})
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

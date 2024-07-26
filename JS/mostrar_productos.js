
let arrayPrincipal = []
function obtener_productis(tipos, equipos) {

    arrayPrincipal = []
    var contador = 0
    var arrauNuevo = []

    console.log(tipos);
    console.log(equipos);

    
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tipos, equipos})
    })
        .then(response => response.json())
        .then(data => {
            data.forEach((element, indice) => {

                contador += 1

                const card = document.createElement('a')
                card.href = '/canasta?id=' + element.id 
                card.classList.add('carta')

                const img = document.createElement('img')
                img.classList.add('img_carta', 'img-fluid')
                img.src = '../IMAGES/kirbo.png'

                const card_body = document.createElement('div')
                card_body.classList.add('txt_carta')

                const label_name = document.createElement('h5')
                label_name.innerText = element.nombre

                const card_footer = document.createElement('div')
                card_footer.classList.add('txt_carta_2')

                const label_costo = document.createElement('a')
                label_costo.innerText = element.costo

                const lbl = document.createElement('label')
                lbl.classList.add('container')
//dede
                const chkbox_deseo = document.createElement('input')
                chkbox_deseo.type = 'checkbox'

                const svgContent = `
                    <svg id="Layer_1" version="1.0" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
                    </svg>
                `;

                lbl.appendChild(chkbox_deseo)
                lbl.innerHTML = svgContent

                card_footer.appendChild(label_costo, chkbox_deseo)
                card_footer.appendChild(lbl)

                card_body.appendChild(label_name)
                card_body.appendChild(card_footer)

                card.appendChild(img)
                card.appendChild(card_body)
                card.setAttribute('tipo', element.tipo)
                card.setAttribute('equipo', element.equipo)

                if (contador == 12) {

                    arrauNuevo.push(card)
                    console.log(arrauNuevo);
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
    })
}

function CambiarPagina(boton) {
    
    
    
    if (boton.childNodes.length != 1) {

        const indice = parseInt(localStorage.getItem('indice'))
        
        if (boton.childNodes[1].textContent === '»' && (arrayPrincipal.length - 1) != indice ) {
        

            console.log(indice);
            console.log(arrayPrincipal.length - 1);
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
    var arrayFiltrado = []

    const filtros = document.querySelectorAll('input[type="checkbox"]:checked')

    console.log(buton.classList[1]);

    if (buton.classList[1] == 'equipos') {
        
        console.log('Hola');
        console.log(buton.value);
        arrayEquipos.push(buton.getAttribute('value'))
    }
    
    filtros.forEach(chk => {

        let existe = arrayEquipos.filter(item => item == chk.value). length > 0
        
        if (chk.classList == 'equipos' && !existe) {
            
            arrayEquipos.push(chk.value)

        } else if (chk.classList == 'tipo') {
            
            arrayTipos.push(chk.value)
        }
    })

    obtener_productis(arrayTipos, arrayEquipos)

}
arrayTipo = []
arrayEquipo = []

obtener_productis(arrayTipo, arrayEquipo)
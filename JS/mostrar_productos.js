
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
                console.log(element);
                console.log(contador);

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

                const label_costo = document.createElement('p')
                label_costo.innerText = element.costo
//dede
                const chkbox_deseo = document.createElement('input')
                chkbox_deseo.classList.add('d-inline-block', 'col-md-3')
                chkbox_deseo.type = 'checkbox'

                card_footer.appendChild(label_costo, chkbox_deseo)
                card_footer.appendChild(chkbox_deseo)

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
    
    filtros.forEach(chk => {
        
        if (chk.classList == 'equipos') {
            
            arrayEquipos.push(chk.value)

        } else if (chk.classList == 'tipo') {
            
            arrayTipos.push(chk.value)
        }
    })

    

    console.log(arrayEquipos);
    console.log(arrayTipos);

    obtener_productis(arrayTipos, arrayEquipos)

}
arrayTipo = []
arrayEquipo = []

obtener_productis(arrayTipo, arrayEquipo)


const arrayPrincipal = []
function obtener_productis() {

    var contador = 0
    var arrauNuevo = []
    
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.forEach((element, indice) => {

                contador += 1


                const card = document.createElement('a')
                card.href = '/canasta?id=' + element.id 
                card.classList.add('card', 'position-relative', 'rounded-4')
                card.setAttribute('style', 'width: 18rem')

                const img = document.createElement('img')
                img.classList.add('card-img-top', 'img-fluid')
                img.src = '../IMAGES/kirbo.png'

                const card_body = document.createElement('div')
                card_body.classList.add('card-body')

                const label_name = document.createElement('p')
                label_name.classList.add('card-text')
                label_name.innerText = element.nombre

                const card_footer = document.createElement('div')
                card_footer.classList.add('row', 'justify-content-between')

                const label_costo = document.createElement('p')
                label_costo.classList.add('class-text', 'd-inline-block', 'col-md-3')
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

                if (contador == 12) {

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

    const container = document.getElementById('menu-productos-container')
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

        console.log(pagination);
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
    

obtener_productis()
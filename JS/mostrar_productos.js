

function obtener_productis() {

    const container = document.getElementById('menu-productos-container')
    
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.forEach((element, indice) => {

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

                container.appendChild(card)
            })
        })
}

obtener_productis()
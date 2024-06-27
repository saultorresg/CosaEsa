contador = 0
conte = ''
item_active = ''
seccion_carousel = document.getElementById('carouselExample')
carousel = document.querySelector('.carousel-inner')

fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.forEach((element, indice) => {
                num = indice -= 1
                if (indice >= 1 && element.equipo !== data[num].equipo) {
                    console.log(element.equipo);
                    nuevo_carousel = seccion_carousel.cloneNode(true)
                    nuevo_carousel.id = 'carousel2'

                    left_button = nuevo_carousel.querySelector('.carousel-control-prev')
                    left_button.setAttribute('data-bs-target', '#carousel2')

                    right_button = nuevo_carousel.querySelector('.carousel-control-next')
                    right_button.setAttribute('data-bs-target', '#carousel2')

                    document.body.appendChild(nuevo_carousel)
                    carousel = nuevo_carousel.querySelector('.carousel-inner')
                    carousel.innerHTML=''
                }
                contador += 1
                if (contador == 5) {
                    
                    contador = 0
                }
                console.log(contador);
                crear_card(element, contador)
                
            });
        })
        .catch(error => console.error(error))

function crear_card(element, contador) {
    
    const card = document.createElement('div');
    const img = document.createElement('img');
    const div_datos = document.createElement('div');
    const equipo = document.createElement('h5')
    const nombre = document.createElement('h5')
                
    img.src = "../IMAGES/kirbo.png"
    img.classList.add('position-absolute', 'img-fluid')

    equipo.textContent = element.equipo
    nombre.textContent = element.jugador

    div_datos.classList.add('nombre_equipo', 'position-absolute', 'float-end')
    equipo.classList.add('mt-3', 'fs-4', 'card-title')
    nombre.classList.add('mt-3', 'fs-4', 'card-title')
    div_datos.appendChild(equipo)
    div_datos.appendChild(nombre)

    card.classList.add('equipo', 'ms-3', 'position-relative')
    card.appendChild(img)
    card.appendChild(div_datos)

    contenedor(element, contador, card)

}

function contenedor(element, contador, card) {

    if (contador == 1) {
        
        const contenedor = document.createElement('div')
        contenedor.id = 'contenedor'
        contenedor.classList.add('contenedor', 'd-flex', 'flex-wrap', 'justify-content-center')

        conte = contenedor
    } 
    conte.appendChild(card)
    
    item_activo(contador, conte)
}

function item_activo(contador, conte) {

    if (contador == 1) {
        
        const item_activo = document.createElement('div')
        item_activo.classList.add('carousel-item', 'active')

        item_active = item_activo
    }

    console.log(item_active);
    console.log(carousel);

    item_active.appendChild(conte)
    carousel.appendChild(item_active)
    
    
}
document.addEventListener('codigoTerminado',  function() {
    
    const btn_agregar = document.querySelector('.btn-agregar')

    btn_agregar.addEventListener('click', function () {

        
        
        AgregarProducto()
    })

   
});

async function AgregarProducto() {
    
    const sesion = localStorage.getItem('sesion');
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const label_contador = document.querySelector('.label-cantidad')
    let numero = []
    let nombre = []
    const talla = []
    const precio = document.getElementById('label-precio').textContent

    const cantidad_perso = DeterminarPersonalizados()

    console.log(cantidad_perso);

    cantidad_perso.forEach(element => {

        talla.push(DeterminarTallas(element, label_contador.value))
        console.log(element.querySelector('#numero'));

        if (element.querySelector('[type="number"]')) {
            
            numero.push(element.querySelector('[type="number"]').value)
        
        } else {
            numero.push('')
        }
    
        if (element.querySelector('[type="text"]')) {
            
            nombre.push(element.querySelector('[type="text"]').value)
        } else {
    
            nombre.push('')
        }
    })
   
    console.log(numero);
    console.log(nombre);
            try {
                const response = await fetch('/auth/agregar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( {
                        cantidad: label_contador.innerText,
                        id: sesion,
                        id_producto: id,
                        numero: numero,
                        nombre: nombre,
                        precio: precio,
                        talla: talla
                    })
                })
        
                const data = await response.json();

                console.log(data.message);
                
                if (data.message === 'ok') {
                    
                    location.reload()
                    window.location.href = '/tienda'
                } else {
                    console.log(data.message);   
                }
            } catch (error) {
                
                console.log(error);   
            }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function DeterminarTallas(element, contador) {
    
    console.log(contador);
    const radio = element.querySelectorAll('[name="tallas' + contador + '"]')

    console.log(radio);

    const radiorray = Array.from(radio)


        for (const element of radiorray) {
            if (element.checked) {
                return element.id.charAt(element.id.length - 1)
            }
        }
 
        return 1
}

function DeterminarPersonalizados() {
    
    const contenedores_personalizadas = document.querySelectorAll('.sectProducto')
    console.log();
    return contenedores_personalizadas
}

document.addEventListener('codigoTerminado',  function() {
    
    const btn_agregar = document.querySelector('.btn-agregar')

    console.log(btn_agregar);

    btn_agregar.addEventListener('click', function () {
        
        AgregarProducto()
    })

    /*const equipos = document.querySelectorAll('.equipo')
    equipos.forEach(equipo => {

        const btn = equipo.querySelector('.btn')

        equipo.addEventListener('mouseenter', function() {
            
            btn.style.visibility = "visible"
            btn.disable = true

            

            this.style.backgroundColor = 'lightgray'; // Ejemplo: Cambia el color de fondo
        });

        equipo.addEventListener('mouseleave', function() {

            btn.style.visibility = 'hidden'
            btn.disable = false
            
            this.style.backgroundColor = ''; // Ejemplo: Restaura el color de fondo
        });
        
    });*/
});

async function AgregarProducto() {
    
    const sesion = localStorage.getItem('sesion');
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const label_contador = document.querySelector('.label-cantidad')
    let numero = ""
    let nombre = ""

    if (document.getElementById('numero')) {
        
        numero = document.getElementById('numero').value
    
    } else {
        numero = ""
    }

    if (document.getElementById('nombre')) {
        
        nombre = document.getElementById('nombre').value
    } else {

        nombre = ""
    }

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
                        nombre: nombre
                    })
                })
        
                const data = await response.json();
                
                if (response.ok) {
                    
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


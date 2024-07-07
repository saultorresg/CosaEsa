document.addEventListener('codigoTerminado', function() {
    
    const equipos = document.querySelectorAll('.equipo')
    equipos.forEach(equipo => {

        const btn = equipo.querySelector('.btn')

        btn.addEventListener('click', async function () {     

            const token = sessionStorage.getItem('authToken');
            const id_canasta = parseJwt(token)
        
            try {
                const response = await fetch('/auth/agregar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( {
                        cantidad: 1,
                        id_canasta: id_canasta.user.id_canasta,
                        id_producto: parseInt(btn.getAttribute('id_producto'))
                    })
                })
        
                const data = await response.json();
                
                if (response.ok) {
                    console.log(data);
                    
                    return
                } else {
                    console.log(data.message);   
                }
            } catch (error) {
                console.log(error);   
            }
        })

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
        
    });
});

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}


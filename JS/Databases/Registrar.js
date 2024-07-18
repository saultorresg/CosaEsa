
function RegistrarUsuarios(event) {
    event.preventDefault()

    console.log(event);

    console.log(event);
    
    const nombreApellido = document.getElementById('nombreApellido').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value

    if(ValidarContrasenia(password, password2)) {

        reg(nombreApellido, email, password)
    }

}

async function reg(name, email, password ,) {


        try {
        
            const response = await fetch('/auth/register', {
    
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
    
            const data = await response.json();
    
            if (response.ok) {
                
                console.log('Respuesta del servidor: ', data);
                response.redirect('/registro')

            } else {
                
                console.log('Error', data.message);
            }
        } catch (error) {
            console.error('Error al registrar ususarios: ', error.message);
        }
    }

function ValidarContrasenia(contra, cotra2) {
    
    if (contra === cotra2) {
        
        return true
    } else {

        return false
    }
}
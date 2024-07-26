
function RegistrarUsuarios(event) {
    event.preventDefault()

    console.log(event);

    console.log(event.target[0].value);
    
    const nombreApellido = document.getElementById('validationCustom01').value
    const email = document.getElementById('validationCustom011').value
    const password = document.getElementById('validationCustom02').value
    const password2 = document.getElementById('validationCustom022').value

    console.log(nombreApellido);
    console.log(email);
    console.log(password);
    console.log(password2);

    if(ValidarContrasenia(password, password2)) {

        reg(nombreApellido, email, password)
    }

}

async function reg(name, email, password ) {


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

console.log('Hola perro');

const form_login = document.getElementById('login');

form_login.addEventListener('click', async function () {


    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
    
        const response = await fetch('/auth/login', {
    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        });
    
        const data = await response.json();
    
        if (response.ok) {
            
            console.log('Respuesta del servidor: ', data);
        }else {
            console.log('Error', data.message);
        }
    } catch (error) {
        console.error('Error al registrar ususarios: ', error.message);
    }
})


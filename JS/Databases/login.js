

function seleccion(event) {
    event.preventDefault();
        
    const inputEmail = document.getElementById('validationCustom01')
    const inputPass = document.getElementById('validationCustom02')

    log(inputEmail, inputPass)

}


async function log(inputEmail, inputPassword) {
    
    const email = inputEmail.value
    const password = inputPassword.value

    try {

        console.log(email);
        console.log(password);
    
        const response = await fetch('/auth/login', {
    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email , password})
        });
    
        const data = await response.json();
        const token = data.token
    
        localStorage.setItem('authToken', data.token)
    
        if (response.ok) {
            
            console.log('Respuesta del servidor: ', data);

            window.location.href = '/'
            fetch('/protected', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token 
                }
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })

            console.log(res);
        }else {

            alert(data.message)
            inputEmail.value = ''
            inputPassword.value = ''
        }
        
    } catch (error) {
        console.error('Error al registrar ususarios: ', error.message);
    }

        
}



function Validar_Email (email) {

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
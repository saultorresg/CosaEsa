

const btn_login = document.getElementById('option6');
const btn_sigin = document.getElementById('option5');


function seleccion() {
    
   
    const input_name = document.getElementById('input_name')
    const form_login = document.getElementById('login');

    if (btn_login.checked) {
        
        btn_login.disabled = true
        btn_sigin.disabled = false

        input_name.style.display = 'none'

    } else if (btn_sigin.checked) {
        
        btn_login.disabled = false
        btn_sigin.disabled = true

        input_name.style.display = 'block'
    }

    form_login.addEventListener('click', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        const advertencia = document.getElementById('advertencia')
        advertencia.innerText = ''

            if (btn_login.checked) {
                await log(email, password)        
            } else if (btn_sigin.checked) {
                if (email === '' || password === '' || name === '') {
                    
                    const advertencia = document.getElementById('advertencia')
                    advertencia.innerText = '* Por favor llene todos los campos *'
                    
                } else {

                    await reg(email, password, name)
                }
            } 
    
    })
}


async function log(email, password) {
    
    try {
    
        const response = await fetch('/auth/login', {
    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        });
    
        const data = await response.json();
        console.log(data.token);
    
        sessionStorage.setItem('authToken', data.token)
    
        if (response.ok) {
            
            console.log('Respuesta del servidor: ', data);
        }else {
            console.log('Error', data.message);
        }
    } catch (error) {
        console.error('Error al registrar ususarios: ', error.message);
    }

        
}

async function reg(email, password ,name) {

    const label_novalido = document.getElementById('label-novalido')

    if (Validar_Email(email)) {
        
        label_novalido.innerText = ''

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
                

            } else {
                
                console.log('Error', data.message);
            }
        } catch (error) {
            console.error('Error al registrar ususarios: ', error.message);
        }
    } else {
        
        label_novalido.innerText = '* Email no valido *'

    }
}

function Validar_Email (email) {

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
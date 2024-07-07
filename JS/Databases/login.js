

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

        if (btn_login.checked) {
            await log(email, password)        
        } else if (btn_sigin.checked) {
            await reg(email, password, name)
        } else {
    
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
    
        sessionStorage.setItem('authToken', data.token)
    
        if (response.ok) {
            
            console.log('Respuesta del servidor: ', data);

            const event = new CustomEvent('tokenChanged', { detail: { data } });
            window.dispatchEvent(event)
        }else {
            console.log('Error', data.message);
        }
    } catch (error) {
        console.error('Error al registrar ususarios: ', error.message);
    }

        
}

async function reg(email, password ,name) {
    
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
}

window.addEventListener('tokenChanged', (event) => {

    const perfil = document.getElementById('perfil')
    console.log('Token changed', event.detail.data['token']);
    const token = parseJwt(event.detail.data['token'])
    perfil.textContent = token.user.name
})

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
}
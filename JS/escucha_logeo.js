(function() {
    const originalSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
        const event = new Event('sessionStorageChange');
        event.key = key;
        event.newValue = value;
        window.dispatchEvent(event);
        originalSetItem.apply(this, arguments);
    };
})();

window.addEventListener('localStorage', (event) => {

    console.log('Cambio detectado en sessionStorage');
    console.log(`Clave: ${event.key}`);
    console.log(`Nuevo valor: ${event.newValue}`);

    const token = parseJwts(event.newValue)
    const perfil = document.getElementById('btn-ingresar')
    perfil.textContent = token.user.name
});

function parseJwts (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

if (localStorage.getItem('authToken')) {
    
    const token = localStorage.getItem('authToken')

    const decode = parseJwts(token)

    const btnLogin = document.getElementById('btn-ingresar')
    btnLogin.remove()

    const btn = document.getElementById('nameUsuario')
    btn.innerText = decode.userName

    console.log(btn);
}




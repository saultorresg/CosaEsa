async function AgregarCanasta(boton) {

    console.log('hola');
    
    try {
        const response = await fetch('/auth/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                cantidad: 1,
                id: localStorage.getItem('sesion'),
                id_producto: boton.getAttribute('el'),
                numero: [''],
                nombre: [''],
                precio: boton.getAttribute('precio'),
                talla: ['1']
            })
        })
    
        const data = response
    
        console.log(data);
    } catch (error) {
        console.log(error);
        
    }

    
    
    
}
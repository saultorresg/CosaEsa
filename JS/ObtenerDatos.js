async function ObtenerDatos(params) {
    
    const anio = document.getElementsByName('fecha')
    const mes = document.getElementById('mes')

    console.log(anio[0].value);
    console.log(mes.value);
    
    

    const fecha = anio[0].value + '-' + mes.value + '-' + '01'

    console.log(fecha);

    try {
        
        const response = await fetch('/auth/regcliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sesion: localStorage.getItem('sesion'),
                nombre: document.getElementsByName('nombre')[0].value,
                primerApellido: document.getElementsByName('apePaterno')[0].value,
                segundoApellido: document.getElementsByName('apeMaterno')[0].value,
                calle: document.getElementsByName('calle')[0].value,
                numExterior: document.getElementsByName('numExterior')[0].value,
                numInterior: document.getElementsByName('numInterior')[0].value,
                colonia: document.getElementsByName('colonia')[0].value,
                codigo: document.getElementsByName('codigo')[0].value,
                municipio: document.getElementsByName('municipio')[0].value,
                entidad: document.getElementsByName('entidad')[0].value,
                pais: document.getElementsByName('pais')[0].value,
                card: document.getElementsByName('card')[0].value,
                fecha: fecha

            })
        })

        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
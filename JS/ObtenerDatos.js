async function ObtenerDatos(params) {
    
    const numExterior = document.getElementsByName('numExterior')[0].value
    const numInterior = document.getElementsByName('numInterior')[0].value
    const colonia = document.getElementsByName('colonia')[0].value
    const codigo = document.getElementsByName('codigo')[0].value
    const municipio = document.getElementsByName('municipio')[0].value
    const entidad = document.getElementsByName('entidad')[0].value
    const pais = document.getElementsByName('pais')[0].value

    console.log(municipio);
    console.log(entidad);
    console.log(pais);

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
                pais: document.getElementsByName('pais')[0].value

            })
        })

        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
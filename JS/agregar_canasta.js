document.addEventListener('codigoTerminado', function() {
    const equipos = document.querySelectorAll('.equipo')
    equipos.forEach(equipo => {

        const btn = equipo.querySelector('.btn')

        equipo.addEventListener('mouseenter', function() {
            
            btn.style.visibility = "visible"
            btn.disable = true

            btn.addEventListener('click', function () {     
                
            })

            this.style.backgroundColor = 'lightgray'; // Ejemplo: Cambia el color de fondo
        });

        equipo.addEventListener('mouseleave', function() {

            btn.style.visibility = 'hidden'
            btn.disable = false
            
            this.style.backgroundColor = ''; // Ejemplo: Restaura el color de fondo
        });
    });

});


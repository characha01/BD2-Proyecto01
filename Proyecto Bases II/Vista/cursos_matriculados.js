
//const listaCursos = controlador.getCursos();
//window.addEventListener('DOMContentLoaded', cargarLista);


function cargarContenidoCursos() {
    fetch('/cargarCursosMatriculados') // Route to fetch data from the server
    .then(response => response.text())
    .then(data => {
        const contenidoCursos = document.getElementById('contenedor-cursos');
        contenidoCursos.innerHTML = data; // Update the div content
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    console.log("LISTENERS")
} 



cargarContenidoCursos();

// Funcion para mostrar la ventana emergente con informaci贸n del curso
function mostrarInformacionCurso(idBotonCurso) {
    console.log("MOSTRAR");
    
    var botonCurso = document.getElementById(idBotonCurso);    


    const idCurso = document.getElementById("idCurso");   
    idCurso.setAttribute('value', botonCurso.getAttribute('data-idCurso'));
}


// Asociar la funcion mostrarInformacionCurso a los botones de curso

/*function agregarListeners(){
    const botonesCurso = document.querySelectorAll('.boton-curso');
    console.log(botonesCurso);
    botonesCurso.forEach((boton) => {
        //console.log(boton.getAttribute('data-nombre'));
        boton.addEventListener('click', () => {
            console.log("CLICK")
            mostrarInformacionCurso(boton);
        });
    })
}
*/

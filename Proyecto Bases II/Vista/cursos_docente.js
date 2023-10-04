
function cargarContenidoCursos() {
    fetch('/cargarCursosDocente')
    .then(response => response.text())
    .then(data => {
        const contenidoCursos = document.getElementById('contenedor-cursos');
        contenidoCursos.innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    console.log("LISTENERS")
} 



cargarContenidoCursos();



function mostrarInformacionCurso(idBotonCurso) {
    console.log("MOSTRAR");
    
    var botonCurso = document.getElementById(idBotonCurso);    


    const idCurso = document.getElementById("idCurso");   
    idCurso.setAttribute('value', botonCurso.getAttribute('data-idCurso'));
}



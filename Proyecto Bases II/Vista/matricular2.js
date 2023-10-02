
//const listaCursos = controlador.getCursos();
//window.addEventListener('DOMContentLoaded', cargarLista);


function cargarContenidoCursos() {
    fetch('/cargarCursos') // Route to fetch data from the server
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
    const popup = document.getElementById('popup');
    const titulo = document.getElementById('popup-titulo');
    const codigo = document.getElementById('popup-codigo');
    const profesor = document.getElementById('popup-profesor');
    const descripcion = document.getElementById('popup-descripcion');
    const fechaInicio = document.getElementById('popup-fecha-inicio');
    const fechaFinal = document.getElementById('popup-fecha-final');
    
    titulo.textContent = botonCurso.getAttribute('data-nombre');
    codigo.textContent = botonCurso.getAttribute('data-codigo');
    profesor.textContent = botonCurso.getAttribute('data-profesor');
    descripcion.textContent = botonCurso.getAttribute('data-descripcion');
    fechaInicio.textContent = botonCurso.getAttribute('data-fecha-inicio');
    fechaFinal.textContent = botonCurso.getAttribute('data-fecha-final');
    
    popup.style.display = 'block'; // Mostrar la ventana emergente
}

// Funci贸n para cerrar la ventana emergente
function cerrarPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none'; // Ocultar la ventana emergente
}

// Asociar la funcion mostrarInformacionCurso a los botones de curso

function agregarListeners(){
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

function matricularDesmatricular() {
    var boton = document.getElementById("matricular");
    if (boton.textContent === "Matricular") {
        boton.textContent = "Desmatricular";
        boton.style.backgroundColor = "#f00";
    } else {
        boton.textContent = "Matricular";
        boton.style.backgroundColor = "#41ff8a";
    }
}
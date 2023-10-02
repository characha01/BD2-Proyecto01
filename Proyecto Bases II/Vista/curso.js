function cargarContenidoCurso() {
    fetch('/cargarCurso') // Route to fetch data from the server
    .then(response => response.json())
    .then(data => {
        console.log(data[1]);
        const tituloCurso = document.getElementById('tituloNombreCurso');
        tituloCurso.innerHTML = data[1];

        const descripcionDeCurso = document.getElementById('descripcionDeCurso');
        descripcionDeCurso.innerHTML = data[3];
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    console.log("VER CURSO")
} 
cargarContenidoCurso();


const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

var textoGrande = "Bienvenidos a Base de Datos 2 Segundo Semestre 2023\n" + '\n' +
"Saludos,\n" +
"Bienvenidos al curso de Bases 2 Semestre Semestre 2023!!! \n" +
"Acá les dejo algunos puntos importantes: \n" +
"1. El Asistente del Curso es Kenneth Ibarra, cualquier cosa pueden preguntarsela a él, él esta en todos los canales del curso, también les puede ayudar si tienen preguntas. \n" +
"2. Vamos a tener un grupo de Telegram para el grupo, acá les dejo el link para que se unan \n" +
"https://t.me/+y7vRB4-tztIxMjFh \n" +
"3. Nos vemos los Martes y Jueves a la 1 pm, vamos a usar el Teams para las clases. \n" +
"4. Instalen el Teams en su Compu o lo puden usar del Web con su cuenta de EstudianTEC, noten que van a necesitar cámara y micrófono \n" +
"5. Unansen al Team del curso usando el link. \n" +
"6. Si por algún motivo no pueden abrir el teams para unirse a las clases pueden hacerlo directo con este link, pero noten que si van a necesitan el Teams.";

var x = "hola\nesto\nes\nuna\nprueba";


let parrafo = document.getElementById("descripcionDeCurso");
parrafo.textContent = textoGrande;





/*
document.getElementById("agregar-pregunta").addEventListener("click", function() {
    const preguntasContainer = document.getElementById("preguntas-container");

    const nuevaPregunta = document.createElement("div");
    nuevaPregunta.innerHTML = `
        <label for="pregunta">Pregunta:</label>
        <input type="text" name="pregunta" required><br>
        <label for="opcion1">Opción 1:</label>
        <input type="text" name="opcion1" required><br>
        <label for="opcion2">Opción 2:</label>
        <input type="text" name="opcion2" required><br>
        <label for="opcion3">Opción 3:</label>
        <input type="text" name="opcion3" required><br>
        <label for="opcion4">Opción 4:</label>
        <input type="text" name="opcion4" required><br><br>
    `;

    preguntasContainer.appendChild(nuevaPregunta);
});

document.getElementById("evaluacion-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // AQUÍ SE CAPTURAN LOS DATOS.
    // Ejemplo de cómo capturar los datos:
    const titulo = document.getElementById("titulo").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;

    const preguntas = [];
    const preguntaElements = document.querySelectorAll("#preguntas-container div");
    preguntaElements.forEach((preguntaElement) => {
        const pregunta = preguntaElement.querySelector("input[name=pregunta]").value;
        const opciones = [];
        for (let i = 1; i <= 4; i++) {
            const opcion = preguntaElement.querySelector(`input[name=opcion${i}]`).value;
            opciones.push(opcion);
        }
        preguntas.push({ pregunta, opciones });
    });

    // ENVIAR DATOS AL SERVIDOR DE PROCESAMIENTO
    console.log("Título:", titulo);
    console.log("Fecha de Inicio:", fechaInicio);
    console.log("Fecha de Fin:", fechaFin);
    console.log("Preguntas:", preguntas);
});

const selectTema = document.getElementById('tema');

const opciones = [
    { value: 'opcion1', text: 'Opción 1' },
    { value: 'opcion2', text: 'Opción 2' },
    { value: 'opcion3', text: 'Opción 3' },
];

opciones.forEach((opcion) => {
    const option = document.createElement('option');
    option.value = opcion.value;
    option.text = opcion.text;
    selectTema.appendChild(option);
}); */
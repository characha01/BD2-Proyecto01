function cargarLogica(){
    const evaluacionForm = document.getElementById('evaluacionForm');
    const preguntasContainer = document.getElementById('preguntasContainer');
    const guardarEvaluacion = document.getElementById('guardarEvaluacion');
    guardarEvaluacion.addEventListener('click', (event) => {
        event.preventDefault();
        console.log("GUARDAR EVALUACION");
        const evaluacion = {
            nombreEvaluacion: document.getElementById('nombreEvaluacion').value,
            preguntas: []
        };

        const preguntasDivs = preguntasContainer.querySelectorAll('.pregunta');
        var contador = 1;
        preguntasDivs.forEach((preguntaDiv) => {
            const preguntaInput = preguntaDiv.querySelector('.pregunta-texto').value;
            const respuestasInputs = preguntaDiv.querySelectorAll('.respuesta');
            const respuestas = [];
            //const radioSeleccion = 

            respuestasInputs.forEach((respuestaInput) => {
                respuestas.push(respuestaInput.value);
            });
            
            var indiceRespuestaCorrecta = getSelectedIndex('Pregunta'+contador);
            contador +=1;
            evaluacion.preguntas.push({
                pregunta: preguntaInput,
                respuestas: respuestas,
                respuestaCorrecta: indiceRespuestaCorrecta
            });
        });
        enviarEvaluacionAlServidor(evaluacion);
    });
};

function getSelectedIndex(groupName) {
    const radioButtons = document.querySelectorAll(`input[type="radio"][name="${groupName}"]`);
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return i;
        }
    }
    // If no radio button is selected, return -1 or handle accordingly
    console.log(groupName)
    return -1;
};




var numeroDePregunta=0;
function agregarPregunta(){
    numeroDePregunta+=1
    const preguntaDiv = document.createElement('div');
    preguntaDiv.classList.add('pregunta');

    const preguntaInput = document.createElement('input');
    preguntaInput.classList.add('pregunta-texto');
    preguntaInput.type = 'text';
    preguntaInput.placeholder = 'Escribe tu pregunta';

    const agregarRespuestaButton = document.createElement('button');
    agregarRespuestaButton.textContent = 'Agregar Respuesta';
    agregarRespuestaButton.addEventListener('click', () => {
        const answerContainer = document.createElement('div');
        answerContainer.style.display = 'flex';

        const radioRespuesta = document.createElement('input');
        radioRespuesta.type = 'radio';
        radioRespuesta.name = 'Pregunta'+numeroDePregunta;

        const respuestaInput = document.createElement('input');
        respuestaInput.classList.add('respuesta');
        respuestaInput.type = 'text';
        respuestaInput.placeholder = 'Escribe una respuesta';

        
        answerContainer.appendChild(respuestaInput);
        answerContainer.appendChild(radioRespuesta);
        
        preguntaDiv.appendChild(answerContainer);

    });

    const eliminarPreguntaButton = document.createElement('button');
    eliminarPreguntaButton.textContent = 'Eliminar Pregunta';
    eliminarPreguntaButton.addEventListener('click', () => {
        preguntasContainer.removeChild(preguntaDiv);
    });

    preguntaDiv.appendChild(preguntaInput);
    preguntaDiv.appendChild(agregarRespuestaButton);
    preguntaDiv.appendChild(eliminarPreguntaButton);
    preguntasContainer.appendChild(preguntaDiv);
};


const radioRespuestaCorrecta = document.createElement('input');
        radioRespuestaCorrecta.setAttribute('type', 'radio');
        radioRespuestaCorrecta.setAttribute('name', 'pregunta'+numeroDePregunta);




const agregarPreguntaButton = document.getElementById('agregarPregunta');
agregarPreguntaButton.addEventListener('click', () => {
    agregarPregunta();
});

const guardarEvaluacion = document.getElementById('guardarEvaluacion');
guardarEvaluacion.addEventListener('click', () =>{
    const preguntasContainer = document.getElementById('preguntasContainer');        
})

cargarLogica();


function enviarEvaluacionAlServidor(evaluacion) {
    // URL del servidor donde deseas enviar la evaluación
    const url = 'http://localhost:3000/guardar_evaluacion';

    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ evaluacion: evaluacion })
    };

   
    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                // La evaluación se envió con éxito al servidor
                console.log('Evaluación enviada con éxito al servidor');
            } else {
                console.error('Error al enviar la evaluación al servidor');
            }
        })
        .catch((error) => {
            console.error('Error al enviar la evaluación al servidor:', error);
        });
}
//const guardarEvaluacion = document.getElementById('guardarEvaluacion');
//guardarEvaluacion.addEventListener('click', () => {
//    enviarEvaluacionAlServidor();
//});




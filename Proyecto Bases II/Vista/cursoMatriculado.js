function cargarContenidoCurso() {
    fetch('/cargarCurso') // Route to fetch data from the server
    .then(response => response.json())
    .then(data => {
        console.log(data[1]);
        const tituloCurso = document.getElementById('tituloNombreCurso');
        tituloCurso.innerHTML = data[1];

        const descripcionDeCurso = document.getElementById('descripcionDeCurso');
        descripcionDeCurso.innerHTML = data[4];
        
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    console.log("VER CURSO")
} 
cargarContenidoCurso();








function cargarTemas() {
    fetch('/cargarTema') // Ruta para obtener datos del servidor
    .then(response => response.json())
    .then(data => {
        
        const temasComboBox = document.getElementById('temasComboBox');
        const temaTexto = document.getElementById('temaTexto');
        const temaDocumento = document.getElementById('temaDocumento');
        const temaVideo = document.getElementById('temaVideo');
        const temaImagen = document.getElementById('temaImagen');

        data.forEach((tema) => {
            const option = document.createElement('option');
            option.value = tema.nombre;
            option.text = tema.nombre;
            temasComboBox.appendChild(option);
        });

        function mostrarInformacionTema() {
            const temaSeleccionado = data.find((tema) => tema.nombre === temasComboBox.value);
            if (temaSeleccionado) {
                temaTexto.textContent = temaSeleccionado.texto;
                console.log(temaSeleccionado.documentos);
                console.log(temaSeleccionado.videos);
                console.log(temaSeleccionado.imagenes);

                // Configura los enlaces para documentos y videos
                temaDocumento.setAttribute("href", "/upload/" + temaSeleccionado.documentos);
                temaVideo.setAttribute("src", "/upload/" + temaSeleccionado.videos);

                // Configura la imagen
                temaImagen.setAttribute("src", "/upload/" + temaSeleccionado.imagenes);
            }
        }

        temasComboBox.addEventListener('change', mostrarInformacionTema);

        mostrarInformacionTema();
        
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
}

cargarTemas();

















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
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
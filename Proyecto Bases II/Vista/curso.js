function cargarContenidoCurso() {
    fetch('/cargarCurso') 
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





function cargarListaEstudiantes() {
    fetch('/obtenerEstudiantes')
    .then(response => response.json())
    .then(data => {
        mostrarEstudiantes(data);
    })
    .catch(error => {
        console.error('Error al obtener estudiantes:', error);
    });
}

function mostrarEstudiantes(estudiantes) {
    const listaEstudiantes = document.getElementById('lista-estudiantes');

    listaEstudiantes.innerHTML = '';

    estudiantes.forEach((estudiante) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${estudiante}`;
        listaEstudiantes.appendChild(listItem);
    });
}

window.addEventListener('load', cargarListaEstudiantes);

function abrirPopup(nombre, descripcion) {
    document.getElementById("popup-titulo").textContent = nombre;
    document.getElementById("popup-descripcion").textContent = descripcion;
    document.getElementById("popup").style.display = "block";
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
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

var botonesCurso = document.querySelectorAll(".curso");
botonesCurso.forEach(function (boton) {
    boton.addEventListener("click", function () {
        var nombreCurso = boton.getAttribute("data-nombre");
        var descripcionCurso = boton.getAttribute("data-descripcion");
        abrirPopup(nombreCurso, descripcionCurso);
    });
});

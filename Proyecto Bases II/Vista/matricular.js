function abrirPopup(popupId, nombre, descripcion) {
    console.log('abrirPopup se llamó con ID:', popupId);
    const popup = document.getElementById(`popup-${popupId}`);
    const popupTitulo = document.getElementById(`popup-titulo-${popupId}`);
    const popupDescripcion = document.getElementById(`popup-descripcion-${popupId}`);

    popupTitulo.textContent = nombre;
    popupDescripcion.textContent = descripcion;
    popup.style.display = 'block';
}

function cerrarPopup(popupId) {
    const popup = document.getElementById(`popup-${popupId}`);
    popup.style.display = 'none';
}

function matricularDesmatricular(popupId) {
    const boton = document.getElementById(`matricular-${popupId}`);
    if (boton.textContent === "Matricular") {
        boton.textContent = "Desmatricular";
        boton.style.backgroundColor = "#f00";
    } else {
        boton.textContent = "Matricular";
        boton.style.backgroundColor = "#41ff8a";
    }
}

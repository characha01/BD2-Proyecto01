

// Crea una instancia de Controller
const controlador = new Controller();


// Función para obtener los valores de los campos de usuario y contraseña y verificar
function login() {
    let username = document.getElementById("login__username").value; // Obtén el valor del campo
    let password = document.getElementById("login__password").value; // Obtén el valor del campo
    if (controlador.verificar(username, password)) {
        location.href = "index_main.html";
    } else {
        alert("Usuario o Contraseña Incorrectos");
    }
}

function register() {
    let username = document.getElementById("username").value; // Obtén el valor del campo
    let password = document.getElementById("password").value; // Obtén el valor del campo
    let fullname = document.getElementById("fullname").value; // Obtén el valor del campo
    let birthdate = document.getElementById("birthdate").value; // Obtén el valor del campo
    let avatar = document.getElementById("avatar").value; // Obtén el valor del campo
    if (controlador.registrar(fullname, birthdate, username, password, avatar)) {
        window.history.back();
        location.href = "logIn.html";
        console.log("holaaaaaaa");
    } else {
        alert("Campos de entrada incorrectos");
    }
}
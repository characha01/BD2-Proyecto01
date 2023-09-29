

// Crea una instancia de Controller
const controlador = new Controller();

document.getElementById("a ver").setAttribute("src", localStorage.getItem("recent-image"));
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
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem(avatar.name, reader.result);

    });
    reader.readAsDataURL(document.getElementById("avatar").files[0])
    const recentImageDataUrl = localStorage.getItem(avatar.name)
    //if (recentImageDataUrl) {
    //    document.getElementById("lodin").setAttribute("src", recentImageDataUrl);
    //}
    saveAs(recentImageDataUrl, recentImageDataUrl.substring(recentImageDataUrl.lastIndexOf('/')+1));
    if (controlador.registrar(fullname, birthdate, username, password, avatar)) {
        //window.history.back();
        //location.href = "logIn.html";
        //document.getElementById("a ver").setAttribute("src", )
        console.log(localStorage.getItem("recent-image"));
    } else {
        alert("Campos de entrada incorrectos");
    }
}
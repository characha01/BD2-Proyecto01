const controlador = new Controller();

document.getElementById("a ver").setAttribute("src", localStorage.getItem("recent-image"));
function login() {
    let username = document.getElementById("login__username").value; 
    let password = document.getElementById("login__password").value; 
    if (controlador.verificar(username, password)) {
        location.href = "index_main.html";
    } else {
        alert("Usuario o Contraseña Incorrectos");
    }
}


function register() {
    let username = document.getElementById("username").value; 
    let password = document.getElementById("password").value; 
    let fullname = document.getElementById("fullname").value; 
    let birthdate = document.getElementById("birthdate").value; 
    let avatar = document.getElementById("avatar").value; 
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        localStorage.setItem(avatar.name, reader.result);

    });
    reader.readAsDataURL(document.getElementById("avatar").files[0])
    const recentImageDataUrl = localStorage.getItem(avatar.name)
    saveAs(recentImageDataUrl, recentImageDataUrl.substring(recentImageDataUrl.lastIndexOf('/')+1));
    if (controlador.registrar(fullname, birthdate, username, password, avatar)) {
        console.log(localStorage.getItem("recent-image"));
    } else {
        alert("Campos de entrada incorrectos");
    }
}
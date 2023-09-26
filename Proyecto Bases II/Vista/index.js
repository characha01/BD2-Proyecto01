console.log("bolleanana");
// const crypto = require('crypto');

class Estudiante {
    constructor(Nombre,fechaNac, userName, password, foto){
        this.Nombre = Nombre;
        this.fechaNac = fechaNac;
        this.userName = userName;
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = Estudiante.encriptar(password);
        this.foto = foto;
        this.cursos = [];
    }

    static encriptar(Npassword){
        const hashC = crypto.createHash('sha256');
        hashC.update(Npassword + this.salt);
        return hashC.digest('hex');
    }

    cambiar_userName(nUser){
        this.userName = nUser;
    }

    
   

    cambiar_password(nPassword){
        
        this.password = Estudiante.encriptar(nPassword);
    }

    cambiar_fechaNac(nFecha){
        this.fechaNac = nFecha;
    }

    cambiar_foto(nFoto){
        this.foto = nFoto;
    }

    matricularCurso(ncurso){
        this.cursos.push(ncurso);
    }

    desmatricularCurso(ncurso){
        this.cursos = this.cursos.filter(ele => ele != ncurso);
    }
}

class Docente {

    constructor(Nombre,fechaNac, userName, password, foto){
        this.Nombre = Nombre;
        this.fechaNac = fechaNac;
        this.userName = userName;
        this.password = Docente.encriptar(password);
        this.salt = crypto.randomBytes(16).toString('hex');
        this.foto = foto;
        this.cursosDocente = [];
    }

    static encriptar(Npassword){
        const hashC = crypto.createHash('sha256');
        hashC.update(Npassword + this.salt);
        return hashC.digest('hex');
    }

    cambiar_userName(nUser){
        this.userName = nUser;
    }

    cambiar_passord(nPassword){
        this.password = Docente.encriptar(nPassword);
    }

    cambiar_fechaNac(nFecha){
        this.fechaNac = nFecha;
    }

    cambiar_foto(nFoto){
        this.foto = nFoto;
    }

    agregarCurso(ncurso){
        this.cursosDocente.push(ncurso);
    }

    quitarCurso(ncurso){
        this.cursosDocente = this.cursos.filter(ele => ele != ncurso);
    }
}
class Curso {
    constructor(_Codigo, _Nombre, _descripcion,  _fechaInicio, _fechaFinal, _imagen, _listaTemas) {
        this._Codigo = _Codigo;
        this._Nombre = _Nombre;
        this._descripcion = _descripcion;
        this._fechaInicio = _fechaInicio;
        this._fechaFinal = _fechaFinal;
        this._imagen = _imagen
        this._listaTemas = _listaTemas;
    }
    
    get Codigo() {
        return this._Codigo;
    }
    set Codigo(value) {
        this._Codigo = value;
    }
    get Nombre() {
        return this._Nombre;
    }
    set Nombre(value) {
        this._Nombre = value;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(value) {
        this._descripcion = value;
    }
    get fechaInicio() {
        return this._fechaInicio;
    }
    set fechaInicio(value) {
        this._fechaInicio = value;
    }
    get fechaFinal() {
        return this._fechaFinal;
    }
    set fechaFinal(value) {
        this._fechaFinal = value;
    }
    get imagen() {
        return this._imagen;
    }
    set imagen(value) {
        this._imagen = value;
    }
    get listaTemas() {
        return this._listaTemas;
    }
    set listaTemas(value) {
        this._listaTemas = value;
    }
    
}
class Tema {
    constructor(_texto, _listaDocumentos, _listaImagenes, _listaVideos){
        this._texto = _texto;
        this._listaDocumentos = _listaDocumentos;
        this._listaImagenes = _listaImagenes;
        this._listaVideos = _listaVideos;
    }
    get texto() {
        return this._texto;
    }
    set texto(value) {
        this._texto = value;
    }

    get listaDocumentos() {
        return this._listaDocumentos;
    }
    set listaDocumentos(value) {
        this._listaDocumentos = value;
    }

    get listaImagenes() {
        return this._listaImagenes;
    }
    set listaImagenes(value) {
        this._listaImagenes = value;
    }

    get listaVideos() {
        return this._listaVideos;
    }
    set listaVideos(value) {
        this._listaVideos = value;
    }
}
class Controller {
    constructor() {
        this._user = null;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    verificar(nombre, password) {
        // Llama a la base de datos para autenticar el usuario
        return true; // Cambia esto según tu lógica de autenticación
    }

    registrar(_Nombre, _fechaNac, _userName, _password, _foto) {
        if (_password.length < 8) {
            return false;
        } else {
            // Llama a la base de datos para registrar el usuario
            return true;
        }
    }
}

// Crea una instancia de Controller
const controlador = new Controller();


// Función para obtener los valores de los campos de usuario y contraseña y verificar
function getValue() {
    let username = document.getElementById("login__username").value; // Obtén el valor del campo
    let password = document.getElementById("login__password").value; // Obtén el valor del campo
    if (controlador.verificar(username, password)) {
        location.href = "index_main.html";
    } else {
        alert("Usuario o Contraseña Incorrectos");
    }
}
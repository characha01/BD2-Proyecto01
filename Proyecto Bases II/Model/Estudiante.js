class Estudiante {
    constructor(id,Nombre,fechaNac, userName, password, foto, cursos, cursosDocente){
        this.id = id;
        this.Nombre = Nombre;
        this.fechaNac = fechaNac;
        this.userName = userName;
        this.password = (password);
        this.foto = foto;
        this.cursos = cursos;
        this.cursosDocente = cursosDocente;
    }

    getId(){
        return this.id;
    }

    cambiar_userName(nUser){
        this.userName = nUser;
    }

    getId() {
        return this._id;
    }

    setId(value) {
        this._id = value;
    }

    getNombre() {
        return this._Nombre;
    }

    setNombre(value) {
        this._Nombre = value;
    }

    getFechaNac() {
        return this._fechaNac;
    }

    setFechaNac(value) {
        this._fechaNac = value;
    }

    getUserName() {
        return this._userName;
    }

    setUserName(value) {
        this._userName = value;
    }

    getPassword() {
        return this._password;
    }

    setPassword(value) {
        this._password = value;
    }

    getFoto() {
        return this._foto;
    }

    setFoto(value) {
        this._foto = value;
    }

    getCursos() {
        return this._cursos;
    }

    setCursos(value) {
        this._cursos = value;
    }

    matricularCurso(ncurso){
        this.cursos.push(ncurso);
    }

    desmatricularCurso(ncurso){
        this.cursos = this.cursos.filter(ele => ele != ncurso);
    }
}

module.exports = Estudiante;
class Docente {
    private _Nombre: String;
    public get Nombre(): String {
        return this._Nombre;
    }
    public set Nombre(value: String) {
        this._Nombre = value;
    }
    private _fechaNac: Date;
    public get fechaNac(): Date {
        return this._fechaNac;
    }
    public set fechaNac(value: Date) {
        this._fechaNac = value;
    }
    private _userName: String;
    public get userName(): String {
        return this._userName;
    }
    public set userName(value: String) {
        this._userName = value;
    }
    private _password: String;
    public get password(): String {
        return this._password;
    }
    public set password(value: String) {
        this._password = value;
    }
    private _foto: Number;
    public get foto(): Number {
        return this._foto;
    }
    public set foto(value: Number) {
        this._foto = value;
    }
    private _cursosDocente: Array<Curso>;
    public get cursosDocente(): Array<Curso> {
        return this._cursosDocente;
    }
    public set cursosDocente(value: Array<Curso>) {
        this._cursosDocente = value;
    }
    private _salt;
    public get salt() {
        return this._salt;
    }
    public set salt(value) {
        this._salt = value;
    }

    constructor(_Nombre,_fechaNac, _userName, _password, _foto){
        this._Nombre = _Nombre;
        this._fechaNac = _fechaNac;
        this._userName = _userName;
        this._password = Docente.encriptar(_password);
        this.salt = crypto.randomBytes(16).toString('hex');
        this._foto = _foto;
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
        this.cursosDocente = this.cursosDocente.filter(ele => ele != ncurso);
    }
}
import * as crypto from 'crypto';

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

    constructor(_Nombre: string, _fechaNac: Date, _userName: string, _password: string, _foto: number) {
        this._Nombre = _Nombre;
        this._fechaNac = _fechaNac;
        this._userName = _userName;
        this._salt = crypto.randomBytes(16).toString('hex');
        this._password = this.encriptar(_password);
        this._foto = _foto;
        this._cursosDocente = [];
    }
    public cambiar_userName(nUser: string) {
        this._userName = nUser;
    }

    public cambiar_password(nPassword: string) {
        this._password = this.encriptar(nPassword);
    }

    public cambiar_fechaNac(nFecha: Date) {
        this._fechaNac = nFecha;
    }

    public cambiar_foto(nFoto: number) {
        this._foto = nFoto;
    }

    public agregarCurso(ncurso: Curso){
        this.cursosDocente.push(ncurso);
    }

    public quitarCurso(ncurso: Curso){
        this.cursosDocente = this.cursosDocente.filter(ele => ele != ncurso);
    }
    public encriptar(Npassword: string) {
        const hashC = crypto.createHash('sha256');
        hashC.update(Npassword + this._salt);
        return hashC.digest('hex');
    }

}
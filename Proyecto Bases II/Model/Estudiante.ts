import * as crypto from 'crypto';

class Estudiante {
    private _Nombre: string;
    private _fechaNac: Date;
    private _userName: string;
    private _password: string;
    private _foto: number;
    private _cursos: Array<Curso>;
    private _salt: string;

    public get Nombre(): string {
        return this._Nombre;
    }
    public set Nombre(value: string) {
        this._Nombre = value;
    }

    public get fechaNac(): Date {
        return this._fechaNac;
    }
    public set fechaNac(value: Date) {
        this._fechaNac = value;
    }

    public get userName(): string {
        return this._userName;
    }
    public set userName(value: string) {
        this._userName = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get foto(): number {
        return this._foto;
    }
    public set foto(value: number) {
        this._foto = value;
    }

    public get cursos(): Array<Curso> {
        return this._cursos;
    }
    public set cursos(value: Array<Curso>) {
        this._cursos = value;
    }

    constructor(Nombre: string, fechaNac: Date, userName: string, password: string, foto: number) {
        this._Nombre = Nombre;
        this._fechaNac = fechaNac;
        this._userName = userName;
        this._salt = crypto.randomBytes(16).toString('hex');
        this._password = this.encriptar(password);
        this._foto = foto;
        this._cursos = [];
    }

    public encriptar(Npassword: string) {
        const hashC = crypto.createHash('sha256');
        hashC.update(Npassword + this._salt);
        return hashC.digest('hex');
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

    public matricularCurso(ncurso: Curso) {
        this._cursos.push(ncurso);
    }

    public desmatricularCurso(ncurso: Curso) {
        this._cursos = this._cursos.filter(ele => ele !== ncurso);
    }
}

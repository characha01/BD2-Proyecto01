import * as crypto from 'crypto';
import Estudiante from './Estudiante';

class Docente extends Estudiante {
    private _cursosDocente: Array<Curso>;
    public get cursosDocente(): Array<Curso> {
        return this._cursosDocente;
    }
    public set cursosDocente(value: Array<Curso>) {
        this._cursosDocente = value;
    }

    constructor(_Nombre: string, _fechaNac: Date, _userName: string, _password: string, _foto: number, _cursosDocente: Array<Curso>) {
        super(_Nombre, _fechaNac, _userName, _password, _foto);
        this._cursosDocente = [];
    }

    public agregarCurso(ncurso: Curso){
        this.cursosDocente.push(ncurso);
    }

    public quitarCurso(ncurso: Curso){
        this.cursosDocente = this.cursosDocente.filter(ele => ele != ncurso);
    }

}
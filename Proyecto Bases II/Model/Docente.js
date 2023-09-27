class Docente extends Estudiante{

    constructor(Nombre,fechaNac, userName, password, foto, cursos, cursosDocente){
        super(Nombre, fechaNac, userName, password, foto, cursos);
        this.cursosDocente = cursosDocente;
    }

    agregarCurso(ncurso){
        this.cursosDocente.push(ncurso);
    }

    quitarCurso(ncurso){
        this.cursosDocente = this.cursos.filter(ele => ele != ncurso);
    }
}
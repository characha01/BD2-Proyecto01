class Estudiante {
    constructor(Nombre,fechaNac, userName, password, foto, cursos){
        this.Nombre = Nombre;
        this.fechaNac = fechaNac;
        this.userName = userName;
        this.password = (password);
        this.foto = foto;
        this.cursos = cursos;
    }

    

    cambiar_userName(nUser){
        this.userName = nUser;
    }

    cambiar_password(nPassword){
        
        this.password = encriptar(nPassword);
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
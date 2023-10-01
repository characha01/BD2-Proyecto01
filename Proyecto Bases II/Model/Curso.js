class Curso {
    constructor(_id, _Codigo, _Nombre, _descripcion,  _fechaInicio, _fechaFinal, _imagen, _listaTemas) {
        this.id = _id;
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
    
};


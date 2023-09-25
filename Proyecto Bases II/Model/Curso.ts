class Curso {
    private _Codigo: string;
    private _Nombre: string;
    private _descripcion: string;
    private _fechaInicio: Date;
    private _fechaFinal: Date;
    private _imagen: Number;
    private _listaTemas: Array<Tema>;
    

    constructor(_Codigo, _Nombre, _descripcion, _fechaInicio, _fechaFinal, _imagen, _listaTemas) {
        this._Codigo = _Codigo;
        this._Nombre = _Nombre;
        this._descripcion = _descripcion;
        this._fechaInicio = _fechaInicio;
        this._fechaFinal = _fechaFinal;
        this._imagen = _imagen
        this._listaTemas = _listaTemas;
    }
    
    public get Codigo(): string {
        return this._Codigo;
    }
    public set Codigo(value: string) {
        this._Codigo = value;
    }
    public get Nombre(): string {
        return this._Nombre;
    }
    public set Nombre(value: string) {
        this._Nombre = value;
    }
    public get descripcion(): string {
        return this._descripcion;
    }
    public set descripcion(value: string) {
        this._descripcion = value;
    }
    public get fechaInicio(): Date {
        return this._fechaInicio;
    }
    public set fechaInicio(value: Date) {
        this._fechaInicio = value;
    }
    public get fechaFinal(): Date {
        return this._fechaFinal;
    }
    public set fechaFinal(value: Date) {
        this._fechaFinal = value;
    }
    public get imagen(): Number {
        return this._imagen;
    }
    public set imagen(value: Number) {
        this._imagen = value;
    }
    public get listaTemas(): Array<Tema> {
        return this._listaTemas;
    }
    public set listaTemas(value: Array<Tema>) {
        this._listaTemas = value;
    }
    
};


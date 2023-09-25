class Curso {
    private _Codigo: string;
    private _Nombre: string;
    private _descripcion: string;
    private _fechaInicio: Date;
    private _fechaFinal: Date;
    private _imagen: string;

    constructor(Codigo, Nombre, descripcion, fechaInicio, fechaFinal, imagen) {
        this._Codigo = Codigo;
        this._Nombre = Nombre;
        this._descripcion = descripcion;
        this._fechaInicio = fechaInicio;
        this._fechaFinal = fechaFinal;
        this._imagen = imagen
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
    public get imagen(): string {
        return this._imagen;
    }
    public set imagen(value: string) {
        this._imagen = value;
    }
    
};


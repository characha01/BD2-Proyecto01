class Tema {
    private _texto: String;
    public get texto(): String {
        return this._texto;
    }
    public set texto(value: String) {
        this._texto = value;
    }
    private _listaDocumentos: Array<Number>;
    public get listaDocumentos(): Array<Number> {
        return this._listaDocumentos;
    }
    public set listaDocumentos(value: Array<Number>) {
        this._listaDocumentos = value;
    }
    private _listaImagenes: Array<Number>;
    public get listaImagenes(): Array<Number> {
        return this._listaImagenes;
    }
    public set listaImagenes(value: Array<Number>) {
        this._listaImagenes = value;
    }
    private _listaVideos: Array<Number>;
    public get listaVideos(): Array<Number> {
        return this._listaVideos;
    }
    public set listaVideos(value: Array<Number>) {
        this._listaVideos = value;
    }

    constructor(_texto, _listaDocumentos, _listaImagenes, _listaVideos){
        this._texto = _texto;
        this._listaDocumentos = _listaDocumentos;
        this._listaImagenes = _listaImagenes;
        this._listaVideos = _listaVideos;
    }
}
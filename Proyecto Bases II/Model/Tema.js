class Tema {
    constructor(_texto, _listaDocumentos, _listaImagenes, _listaVideos){
        this._texto = _texto;
        this._listaDocumentos = _listaDocumentos;
        this._listaImagenes = _listaImagenes;
        this._listaVideos = _listaVideos;
    }
    get texto() {
        return this._texto;
    }
    set texto(value) {
        this._texto = value;
    }

    get listaDocumentos() {
        return this._listaDocumentos;
    }
    set listaDocumentos(value) {
        this._listaDocumentos = value;
    }

    get listaImagenes() {
        return this._listaImagenes;
    }
    set listaImagenes(value) {
        this._listaImagenes = value;
    }

    get listaVideos() {
        return this._listaVideos;
    }
    set listaVideos(value) {
        this._listaVideos = value;
    }
}
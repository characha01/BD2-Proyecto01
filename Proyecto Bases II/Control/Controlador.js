const Estudiante = require('../Model/Estudiante.js');
//const insertMongo = require('../connection/insertP.js');

class Controller {
    constructor() {
        this._user = new Estudiante("", new Date(), "", "", -1, []);
        this.contador=0;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    verificar(nombre, password) {
        //insertRedis.
        return true; // Cambia esto según tu lógica de autenticación
    }

    registrar(_Nombre, _fechaNac, _userName, _password, _foto) {
        if (_password.length < 8) {
            return false;
        } else {
            // Llama a la base de datos para registrar el usuario
            return true;
        }
    }
    registrarImagen(path) {
        //insertMongo(this.contador, path);
        this.contador++;
        return this.contador-=1
    }
}
module.exports = Controller;
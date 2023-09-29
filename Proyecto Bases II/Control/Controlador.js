const Estudiante = require('../Model/Estudiante.js');

class Controller {
    constructor() {
        this._user = new Estudiante("", new Date(), "", "", -1, []);
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    verificar(nombre, password) {
        // Llama a la base de datos para autenticar el usuario
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
}
module.exports = Controller;
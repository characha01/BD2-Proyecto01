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

    registrar(username, password, salt, full_name, birthdate, picture, is_teacher) {
        if (password.length < 8) {
            return false;
        } else {
            const { DocumentStore } = require('ravendb');

            const store = new DocumentStore('http://localhost:8080', 'Usuarios');

            store.initialize();

            const max = {
            username: username,
            password: password,
            salt: salt,
            full_name: full_name,
            birthdate: birthdate,
            picture: picture,
            is_teacher: is_teacher
            };

            async function guardarUsuario(usuario) {

            const session = store.openSession();

            try {

                usuario['@metadata'] = {
                '@collection': 'Usuarios', 
                };

                await session.store(usuario);

                await session.saveChanges();

                console.log('El objeto "usuario" se ha guardado con éxito en la colección "Usuarios".');
            } catch (error) {
                console.error('Error al guardar el objeto "usuario":', error);
            } finally {
                session.dispose();
                store.dispose();
            }
            }

            guardarUsuario(max);
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
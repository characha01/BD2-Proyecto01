const Estudiante = require('../Model/Estudiante.js');
//const insertMongo = require('../connection/insertP.js');
const mongoose = require('mongoose');
const redis = require('redis');
var cassandra = require('cassandra-driver');
const { ObjectId } = require('mongodb');
const Redis = require('ioredis');
const bcrypt = require('bcrypt');

const client = new Redis();
function conectarMongo(){
	mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6');
	var dbMongo = mongoose.connection;
	dbMongo.on('error', console.error.bind(console, 'CONNECTION ERROR'));
	dbMongo.once('open', function () {
	console.log('Connected: Mongo');
	});
	return mongoose;   
}

function conectarRedis(){
	const clientRedis = redis.createClient({ url: 'redis://127.0.0.1:6379' });
	const redisConnection = async () => {
	await clientRedis.connect()
	clientRedis.on('error', (err) => {
	console.error(`An error occurred with Redis: ${err}`)
	})
	console.log('Connected: Redis')
	}
	redisConnection(); 
	return clientRedis;    
}


function conectarRaven(){
	const { DocumentStore } = require('ravendb');
	const store = new DocumentStore('http://localhost:8080', 'usuarios');
	store.initialize();
	const session = store.openSession();
	return session;
}

function conectarCassandra(){
    const clientCassandra = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'test'
    });
    clientCassandra.connect(function(err, result){
    console.log('Connected: Cassandra')
    });
    return clientCassandra;    
}

async function getRedisValue(key,index) {
    return new Promise((resolve, reject) => {
      client.lindex(key, index, (error, firstElement) => {
        if (error) {
          console.error(`Error al obtener el primer elemento de la lista "${key}": ${error.message}`);
          reject(error);
        } else {
          if (firstElement === null) {
            console.log(`La lista "${key}" está vacía o no existe en Redis.`);
            resolve(null);
          } else {
            resolve(firstElement);
          }
        }
      });
    });
  }

class Controller {
    constructor() {
        this._user = new Estudiante("", new Date(), "", "", -1, [], []);
        this.contador=0;
        this.mongoose = conectarMongo();
        this.dbRedis = conectarRedis();
        this.dbCassandra = conectarCassandra();
        this.dbRaven = conectarRaven();
        this.Documentos = new this.mongoose.Schema ({ruta : String});
    }
    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }


    async  verificar_usuario(nombre, password) {
        async function valid(nombre, password) {
          try {
            const storedHash = await getRedisValue(nombre, 0);
            
            if (storedHash !== null) {
             
              const passwordMatch = await bcrypt.compare(password, storedHash);
              console.log(passwordMatch);
              return passwordMatch; 
            } else {
              console.log(`La clave "${nombre}" no existe en Redis.`);
              return false; // La clave no existe, por lo que la autenticación falla
            }
          } catch (error) {
            console.error(`Error en la función principal: ${error.message}`);
            return false; // Manejar errores y devolver false en caso de error
          }
        }
        
        const isMatch = await valid(nombre, password);
        return isMatch;
    }
    
    async loginUsuario(nombre, password) {
        
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        const elementos = [];
      
        elementos.push(hashPassword);
        elementos.push(salt);
      
        try {
            const length = await client.rpush(nombre, ...elementos);
            console.log(`Se agregaron ${length} elementos a la lista.`);
            return true; 
        } catch (error) {
            console.error(`Error al agregar elementos a la lista: ${error.message}`);
            return false; 
        }
    }

    async registrarUsuario (username, password, full_name, birthdate, path, is_teacher) {
        if (password.length < 8) {
            return false;
        } else {
            this.loginUsuario(username,password);
            const Documento = this.mongoose.model("Documento",this.Documentos);
            async function insertMongo(path) {
                try{
                    const newData = new Documento({ruta : path});//mismo nombre del modelo
                    await newData.save();
                    console.log('Dato insertado en MongoDB:', newData);
                }catch(error){
                    console.error('Error al insertar dato en MongoDB:', error);
                }
            }
            insertMongo(path);
			let data = new ObjectId();
            async function getMongo(path) {
            try {
                data = await Documento.findOne({ ruta: path }); // Filtra por la ruta
                if (data) {
                const idDelDocumento = data._id;
                console.log('Datos obtenidos de MongoDB:', data._id);
                } else {
                console.log('Documento no encontrado en MongoDB');
                }
            } catch (error) {
                console.error('Error al obtener datos de MongoDB:', error);
            }
            }
            getMongo(path)
                .then(() => {
                    if (data) {
                    const idDelDocumento = data._id;
                    console.log('ID del documento:', idDelDocumento);
                    }
                });
            getMongo(path);
            console.log(path);

            const { DocumentStore } = require('ravendb');

            const store = new DocumentStore('http://localhost:8080', 'Usuarios');

            store.initialize();

            const max = {
            username: username,
            password: password,
            full_name: full_name,
            birthdate: birthdate,
            picture: data._id.toString(),
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
	
	async registrarCurso(codigo, descripcion, fechaFinal, fechaInicio, nombre, path){
        
        const Documento = this.mongoose.model("Documento",this.Documentos);
        async function insertMongo(path) {
            try{
                const newData = new Documento({ruta : path});//mismo nombre del modelo
                await newData.save();
                console.log('Dato insertado en MongoDB:', newData);
            }catch(error){
                console.error('Error al insertar dato en MongoDB:', error);
            }
        }
        insertMongo(path);
        let data = new ObjectId();
        async function getMongo(path) {
        try {
            data = await Documento.findOne({ ruta: path }); // Filtra por la ruta
            if (data) {
            const idDelDocumento = data._id;
            console.log('Datos obtenidos de MongoDB:', data._id);
            } else {
            console.log('Documento no encontrado en MongoDB');
            }
        } catch (error) {
            console.error('Error al obtener datos de MongoDB:', error);
        }
        }
        getMongo(path)
            .then(() => {
                if (data) {
                const idDelDocumento = data._id;
                console.log('ID del documento:', idDelDocumento);
                }
            });
        getMongo(path);

		this.dbCassandra.execute('USE test');
		const query = 'INSERT INTO curso (id, codigo, descripcion, fechafinal, fechainicio, idfoto, idprofesor, nombre) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?)';
  		const params = [codigo, descripcion, fechaFinal, fechaInicio, data._id.toString(), this.user.getId(), nombre];
		this.dbCassandra.execute(query, params, { prepare: true }, function(err, result) {
			if (err) {
				console.error('Error al insertar datos:', err);
                return false;
			} else {
				console.log('Datos insertados exitosamente');
                return true;
			}
		});		
	}

    async obtenerUsuario(username) {
        try {
            const usuario = await this.dbRaven.query({ collection: 'Usuarios' })
            .whereEquals('username', username)
            .firstOrNull();

            if (!usuario) {
            console.log(`No se encontró ningún usuario con el username '${username}'.`);
            return null;
            }

            const password = usuario.password;
            const full_name = usuario.full_name;
            const foto = usuario.picture;
            const birthdate = usuario.birthdate;

            this._user.setPassword(password);
            this._user.setFechaNac(birthdate);
            this._user.setNombre(full_name);
            this._user.setUserName(username);
            this._user.setFoto(foto);



            //console.log(`Contraseña del usuario '${username}': '${this._user.getPassword()}'.`);
            
        } catch (error) {
            console.error('Error al obtener la contraseña del usuario:', error);
        } finally {
            this.dbRaven.dispose();
        }
    }
    async getCursos(){
        const query = 'SELECT nombre FROM curso';
        const params = [];
        const listaCursos = [];
        const curso = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
            for (const row of result) {
                listaCursos.push(row.nombre);
            }
        return listaCursos; 
    }

    async getNombreCurso(id){
        const query = 'SELECT nombre FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].nombre);
        return result.nombre;
    }

    async getNombreCurso(id){
        const query = 'SELECT nombre FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].nombre);
        return result.nombre;
    }

    async getCodigoCurso(id){
        const query = 'SELECT codigo FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].codigo);
        return result.nombre;
    }

    async getDescripcionCurso(id){
        const query = 'SELECT descripcion FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].descripcion);
        return result.nombre;
    }

    async getFechaInicioCurso(id){
        const query = 'SELECT fechaInicio FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].fechainicio);
        return result.nombre;
    }

    async getFechaFinalCurso(id){
        const query = 'SELECT fechafinal FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].fechafinal);
        return result.nombre;
    }

    async getProfesorCurso(id){
        const query = 'SELECT idProfesor FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].idprofesor);
        return result.nombre;
    }

    


}
module.exports = Controller;
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

async function claveExiste(databaseNumber, clave) {
    return new Promise((resolve, reject) => {
        client.select(databaseNumber, () => {
            client.exists(clave, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply === 1); // Resuelve `true` si existe, `false` si no existe
                }
            });
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
    getUser() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }
    //Metodos para ingresar cursos matriculados por usuario
    async agregarCursoMatriculado(usuario, curso) {
        const validation = await claveExiste(0,usuario);
        if (validation) {
            const list = [curso];
            return new Promise((resolve, reject) => {
                client.select(3, () => {
                    
                    client.rpush(usuario, ...list, (err, result) => {
                        if (err) {
                            console.error('Error al agregar curso:', err);
                            reject(err);
                        } else {
                            console.log('Curso agregado con éxito');
                            resolve(true);
                        }
                    });
                });
            });
        } else {
            
            console.log(`El usuario '${usuario}' no existe en la base de datos.`);
            return false; 
        }
      }
      //Metodo para obtener la lista de cursos de un usuario 
      async  getCursosMatriculados(usuario) {
        const validation = await claveExiste(0,usuario);
        if(validation){
          return new Promise((resolve, reject) => {
              client.select(3, () => {
                  
                  client.lrange(usuario, 0, -1, (err, result) => {
                      if (err) {
                          console.error('Error al obtener la lista de cursos:', err);
                          reject(err);
                      } else {
                          console.log('Lista de cursos obtenida con éxito');
                          resolve(result);
                      }
                  });
              });
          });
        }else{
          console.log(`El usuario '${usuario}' no existe en la base de datos.`);
          
        }
      }
      //Metodo para eliminar curso matriculado de un usuario
      async  eliminarCursoRedis(usuario, curso) {
        const validation = await claveExiste(0, usuario);
        if (validation) {
          return new Promise((resolve, reject) => {
            client.select(3, () => {
              // Utiliza LREM para eliminar todos los elementos coincidentes en la lista
              client.lrem(usuario, 0, curso, (err, result) => {
                if (err) {
                  console.error('Error al eliminar el curso:', err);
                  reject(err);
                } else {
                  if (result > 0) {
                    console.log(`Curso '${curso}' eliminado con éxito`);
                    resolve(true);
                  } else {
                    console.log(`El curso '${curso}' no existe en la lista.`);
                    resolve(false);
                  }
                }
              });
            });
          });
        } else {
          console.log(`El usuario '${usuario}' no existe en la base de datos.`);
          return false;
        }
    
    }
    // #####################################################
//#################### Docente ######################
// ####################################################
async agregarCursoRedisDocente(usuario, curso) {
    const validation = await claveExiste(0,usuario);
    if (validation) {
        const list = [curso];
        return new Promise((resolve, reject) => {
            client.select(4, () => {
                
                client.rpush(usuario, ...list, (err, result) => {
                    if (err) {
                        console.error('Error al agregar curso:', err);
                        reject(err);
                    } else {
                        console.log('Curso agregado con éxito');
                        resolve(true);
                    }
                });
            });
        });
    } else {
        
        console.log(`El usuario '${usuario}' no existe en la base de datos.`);
        return false; 
    }
  }

  async  eliminarCursoRedisDocente(usuario, curso) {
    const validation = await claveExiste(0, usuario);
    if (validation) {
      return new Promise((resolve, reject) => {
        client.select(4, () => {
          
          client.lrem(usuario, 0, curso, (err, result) => {
            if (err) {
              console.error('Error al eliminar el curso:', err);
              reject(err);
            } else {
              if (result > 0) {
                console.log(`Curso '${curso}' eliminado con éxito`);
                resolve(true);
              } else {
                console.log(`El curso '${curso}' no existe en la lista.`);
                resolve(false);
              }
            }
          });
        });
      });
    } else {
      console.log(`El usuario '${usuario}' no existe en la base de datos.`);
      return false;
    }
  }

  async  obtenerListaCursosRedisDocente(usuario) {
    const validation = await claveExiste(0,usuario);
    if(validation){
      return new Promise((resolve, reject) => {
          client.select(4, () => {
              
              client.lrange(usuario, 0, -1, (err, result) => {
                  if (err) {
                      console.error('Error al obtener la lista de cursos:', err);
                      reject(err);
                  } else {
                      console.log('Lista de cursos obtenida con éxito');
                      resolve(result);
                  }
              });
          });
      });
    }else{
      console.log(`El usuario '${usuario}' no existe en la base de datos.`);
      
    }
  }
  


    
      //Metodo para verificar que el password sea correcto
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
    //Metodo para ingresar el usuario, password y slat a Redis
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
    //Metodo para guardar evaluacion en Redis
    async guardar_evaluacionRedis(name, objeto_evaluacion) {
        return new Promise((resolve, reject) => {
            client.select(2, () => {
                console.log('Conectado a la base de datos 1');
                
                client.set(name, JSON.stringify(objeto_evaluacion), (err, result) => {
                    if (err) {
                        console.error('Error al establecer la clave:', err);
                        reject(err); 
                    } else {
                        console.log('Clave establecida con éxito en la base de datos 1');
                        resolve(true); 
                    }
                });
            });
        });
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
  		const params = [codigo, descripcion, fechaFinal, fechaInicio, data._id.toString(), this._user.getId(), nombre];
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
        const query = 'SELECT id, nombre, codigo, idprofesor, descripcion, fechainicio, fechaFinal FROM curso';
        const params = [];
        const listaCursos = [];
        var curso = []
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
            for (const row of result) {
                curso.push(row.id.toString());
                curso.push(row.nombre);
                curso.push(row.codigo);
                //curso.push(row.idprofesor);
                curso.push(row.descripcion);
                curso.push(row.fechainicio.toString());
                curso.push(row.fechafinal.toString());
                listaCursos.push(curso);
                curso = [];
            }
        return listaCursos; 
    }
    async getCurso(idCurso){
        const query = 'SELECT id, nombre, codigo, idprofesor, descripcion, fechainicio, fechaFinal FROM curso where id = ?';
        const params = [idCurso];
        const listaCurso = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
            for (const row of result) {
                listaCurso.push(row.id.toString());
                listaCurso.push(row.nombre);
                listaCurso.push(row.codigo);
                //curso.push(row.idprofesor);
                listaCurso.push(row.descripcion);
                listaCurso.push(row.fechainicio.toString());
                listaCurso.push(row.fechafinal.toString());
            }
        return listaCurso; 
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
        return result.rows[0].nombre;
    }

    async getCodigoCurso(id){
        const query = 'SELECT codigo FROM curso where id = ?';
        const params = [id];
        const listaCursos = [];
        await this.dbCassandra.execute('USE test');
        const result = await this.dbCassandra.execute(query, params, { prepare: true });
        console.log(result.rows[0].codigo);
        return result.rows[0].codigo;
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

    async registrarTema(texto, documentos, video, imagen) {
        const { DocumentStore } = require('ravendb');
        const store = new DocumentStore('http://localhost:8080', 'Usuarios');
        store.initialize();
      
        const tema = {
          texto: texto,
          documentos: documentos,
          videos: video,
          imagenes: imagen
        };
      
        async function guardarTema(tema) {
            const session = store.openSession();
      
            try {
                tema['@metadata'] = {
                    '@collection': 'Temas', 
                };
      
                await session.store(tema);
                await session.saveChanges();
      
                console.log('El objeto "tema" se ha guardado con éxito en la colección "Temas".');
            } catch (error) {
                console.error('Error al guardar el objeto "tema":', error);
            } finally {
                session.dispose();
                store.dispose();
            }
        }
    
        await guardarTema(tema);
      
        return true;
      }

    


}
module.exports = Controller;
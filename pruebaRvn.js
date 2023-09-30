const { DocumentStore } = require('ravendb');

const store = new DocumentStore('http://localhost:8080', 'Usuarios');

store.initialize();


async function obtenerPasswordDeUsuario(username) {
  const session = store.openSession();

  try {
    const usuario = await session.query({ collection: 'Usuarios' })
      .whereEquals('username', username)
      .firstOrNull();

    if (!usuario) {
      console.log(`No se encontró ningún usuario con el username '${username}'.`);
      return null;
    }

    const password = usuario.password;
    const full_name = usuario.full_name;
    const salt = usuario.salt;
    const foto = usuario.picture;
    const birthdate = usuario.birthdate;

    const user = new Estudiante(0, full_name, username, password, foto, "c", "cd");


    console.log(`Contraseña del usuario '${username}': '${foto}'.`);
    return user;
  } catch (error) {
    console.error('Error al obtener la contraseña del usuario:', error);
    return null;
  } finally {
    session.dispose();
    store.dispose();
  }
}

async function main() {
  const username = 'max123';
  obtenerPasswordDeUsuario(username);
}

// Llama a la función principal
main();

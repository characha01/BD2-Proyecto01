const { DocumentStore } = require('ravendb');

const store = new DocumentStore('http://localhost:8080', 'Usuarios');

store.initialize();


async function registrarTema(texto, documentos, video, imagen) {
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

  // Pasa el objeto 'tema' como un solo argumento a 'guardarTema'
  await guardarTema(tema);

  return true;
}


registrarTema("prueba1", "documentoooo", "videooo", "imageeeen");

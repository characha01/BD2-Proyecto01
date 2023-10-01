const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = 3000;
const Controller = require('./Proyecto Bases II/Control/Controlador.js')


const controlador = new Controller();

app.use(express.static(path.join(__dirname, 'Proyecto Bases II/Vista')));
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + extname); // Renombrar el archivo con una marca de tiempo
    }
});
const upload = multer({ storage: storage });

// Ruta para cargar la imagen
app.post('/upload', upload.single('imagen'), (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/register.html'));
    if (!req.file) {
        alert("Error");
    }
    else{
    const rutaImagen = path.basename(req.file.path);
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const birthdate = req.body.birthdate;
    const image = req.body.imagen;
    const is_teacher = false;
    console.log(rutaImagen);
    controlador.registrarUsuario(username, password, fullname, birthdate, rutaImagen, is_teacher);
    res.redirect('index.html');
    }
});
app.post('/verify', async(req, res) => {
    const username = req.body.login__username;
    const password = req.body.login__password;

    console.log(username + " " + password);
    
    try {
        const isMatch = controlador.verificar_usuario(username, password);

        if (isMatch) {
            res.redirect('index_main.html');
            controlador.obtenerUsuario(username);
        } else {
            
            res.send('Autenticación fallida');
        }
    } catch (error) {
        console.error(error);
        
        res.status(500).send('Error en la autenticación');
    }

});
app.post('/curso',upload.single('imagen'), (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/index_curso_registrar.html'));
    if (!req.file) {
        //alert("Error");
        console.log('no funciona imagen');
    }
    else{
        const codigo = req.body.Codigo;
        const nombre = req.body.Nombre;
        const descripcion = req.body.descripcion;
        const fechaInicio = req.body.fecha;
        const fechaFinal= req.body.fechaF;
        const rutaImagen = path.basename(req.file.path);
        
        if (controlador.registrarCurso(codigo, descripcion, fechaFinal, fechaInicio, nombre, rutaImagen)) {
            res.redirect('index_main.html');
        }
        // Perform any necessary actions with username and password
    }
});

//Esta funciona rellena los espacios del usuario en la pantalla de editar Perfil
app.get('/editPerfil', (req, res) => {
    // Lee el contenido del archivo HTML
    const formularioHTML = fs.readFileSync('edit_user_info.html', 'utf-8');
    let username = controlador.getUser()._userName;
    let password = controlador.getUser()._password;
    let nombre = controlador.getUser()._Nombre;
    let fechaNac = controlador.getUser()._fechaNac;
    let foto = controlador.getUser()._foto;
    // Modifica el contenido del formulario según sea necesario
    const formularioLleno = formularioHTML
        .replace('value=""', 'value="${username}"') // Reemplaza con el valor deseado
        .replace('value=""', 'value="${password}"') // Reemplaza con el valor deseado
        .replace('value=""', 'value="${nombre}"') // Reemplaza con el valor deseado
        .replace('value=""', 'value="${fechaNac}"') // Reemplaza con el valor deseado
        .replace('value=""', 'value="${foto}"'); // Reemplaza con el valor deseado

    // Envía el formulario modificado como respuesta
    res.send(formularioLleno);
});

app.post('/editPerfil',upload.single('imagen'), (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/register.html'));
    if (!req.file) {
        alert("Error");
    }
    else{
    const rutaImagen = path.basename(req.file.path);
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const birthdate = req.body.birthdate;
    const is_teacher = false;
    console.log(rutaImagen);
    controlador.editUsuario(username, password, fullname, birthdate, rutaImagen, is_teacher);
    res.redirect('index_main.html');
    }
});


app.get('/api/cursos', async (req, res) => {
    const cursos = await controlador.getCursos();
    console.log(cursos);
    
    // Construir una lista HTML de botones para los cursos
    let listaCursosHTML = '';
    
    cursos.forEach((nombreCurso, index) => {
        // Generar un ID único para cada popup
        const popupId = `popup-${index}`;
        
        // Crea un botón para cada curso y agrega un atributo data con el nombre del curso
        listaCursosHTML += `<button class="curso" data-nombre="${nombreCurso}" onclick="abrirPopup('${popupId}', 'hola', 'hola')">${nombreCurso}</button>`;
        listaCursosHTML += `<div id="${popupId}" class="popup">`;
        listaCursosHTML += `<div class="popup-content">`;
        listaCursosHTML += `<span class="popup-close-button" onclick="cerrarPopup()">&times;</span>`;
        listaCursosHTML += '<h2 class="popup-titulo">Nombre de Curso</h2>';
        listaCursosHTML += '<p class="popup-descripcion">Aquí va la descripción del curso.</p>';
        listaCursosHTML += `<button class="matricular" onclick="matricularDesmatricular('${popupId}')">Matricular</button>`;
        listaCursosHTML += '</div>';
        listaCursosHTML += '</div>';
    });
    
    // Envía la lista de cursos HTML como respuesta al cliente
    res.send(listaCursosHTML);
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
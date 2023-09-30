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
app.post('/verify', (req, res) => {
    const username = req.body.login__username;
    const password = req.body.login__password;

    console.log(username + " " + password);
    console.log(controlador.verificar_usuario(username, password));
    if (controlador.verificar_usuario(username, password)) {
        res.redirect('index_main.html');
    }
    // Perform any necessary actions with username and password

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



app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
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
        
    }
    
    const username = req.body.username;
    const password = req.body.password;
    const salt = req.body.salt;
    const fullname = req.body.fullname;
    const birthdate = req.body.birthdate;
    const image = req.body.imagen;
    const is_teacher = false;

    controlador.registrar(username, password, salt, fullname, birthdate, image, is_teacher)
});
app.post('/verify', (req, res) => {
    const username = req.body.login__username;
    const password = req.body.login__password;

    console.log(username + " " + password);
    if (controlador.verificar(username, password)) {
        res.redirect('index_main.html');
    }
    // Perform any necessary actions with username and password

});


app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
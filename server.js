const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const Controller = require('./Proyecto Bases II/Control/Controlador.js')
const Singleton = require('./Proyecto Bases II/Control/Singleton.js');

var idCursoActual=-1;


const controlador = Singleton.getInstance();

app.use(express.static(path.join(__dirname, 'Proyecto Bases II/Vista')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); 
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        cb(null, Date.now() + extname); 
    }
});
const upload = multer({ storage: storage });


app.post('/upload', upload.single('imagen'), (req, res) => {
    try{
    console.log("MATRICULAR");
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/register.html'));
    if (!req.file) {
        console.log("No funciona Imagen");
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
    }
    catch(err){
        console.log(err);
    }
});

app.post('/matricular', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/matricular2.html'));
    if (!req.file) {
        console.log("No funciona Imagen");
    }
    else{
        const listaCursos = controlador.getCursos();
        const output = document.querySelector('.scrollable-container');
        let temp = "";
        listaCursos.forEach(nombreCurso =>{
            temp += `<button class="curso" data-nombre="${nombreCurso}"data-codigo="C001" data-profesor="Profesor 1" data-descripcion="Descripción del Curso 1" data-fecha-inicio="01/10/2023" data-fecha-final="30/10/2023" id="1">Curso 1</button>`;
        })
        cursos.innerHTML = temp;
        res.redirect('matricular2.html');
    }
});
app.post('/verify', async(req, res) => {
    const username = req.body.login__username;
    const password = req.body.login__password;

    console.log(username + " " + password);
    
    try {
        const isMatch = await controlador.verificar_usuario(username, password);
        console.log(isMatch);
        if (isMatch) {
            res.redirect('index_main.html');
            controlador.obtenerUsuario(username);
        } else {
            res.redirect('index.html');
        }
    } catch (error) {
        res.redirect('index.html');
    }

});
app.post('/curso',upload.single('imagen'), (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Proyecto Bases II/Vista/index_curso_registrar.html'));
    if (!req.file) {
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

    }
});

app.get('/cargarPerfil', async (req, res) => {
    let username = controlador.getUser().getUserName();
    let password = controlador.getUser().getPassword();
    let nombre = controlador.getUser().getNombre();
    let fechaNac = controlador.getUser().getFechaNac();
    let foto = controlador.getUser().getFoto();
    const path = await controlador.getPath(foto);
    console.log(path);
    const usuario = []
    usuario.push(username);
    usuario.push(password);
    usuario.push(nombre);
    usuario.push(fechaNac);
    
    usuario.push(path);
    res.send(usuario);
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
    
    let listaCursosHTML = '';
    
    cursos.forEach((nombreCurso, index) => {
        var popupId = index;
        
        listaCursosHTML += `<button class="curso" data-nombre="${nombreCurso}" id="${popupId}">${nombreCurso}</button>`;
        listaCursosHTML += `<div id="${popupId}" class="popup">`;
        listaCursosHTML += `<div class="popup-content">`;
        listaCursosHTML += `<span class="popup-close-button" onclick="cerrarPopup()">&times;</span>`;
        listaCursosHTML += '<h2 class="popup-titulo">Nombre de Curso</h2>';
        listaCursosHTML += '<p class="popup-descripcion">Aquí va la descripción del curso.</p>';
        listaCursosHTML += `<button class="matricular" onclick="matricularDesmatricular(${popupId})">Matricular</button>`;
        listaCursosHTML += '</div>';
        listaCursosHTML += '</div>';
    });
    
    console.log(listaCursosHTML);
    res.send(listaCursosHTML);
    
});
app.get('/cargarCursos', async (req, res) => {
    let temp = "";
    const usuarioActual = controlador.getUser().getUserName();
    const listaCursos = await controlador.getCursos();
    const listaCursosMatriculados = await controlador.getCursosMatriculados(usuarioActual);
    console.log(listaCursosMatriculados);
    if(listaCursos == undefined) {}
    else{
        if(listaCursosMatriculados == undefined) {
            listaCursos.forEach(async (nombreCurso, index) =>{   
                temp += `<button class="boton-curso" data-idCurso="${nombreCurso[0]}" data-nombre="${nombreCurso[1]}"data-codigo="${nombreCurso[2]}" onclick=mostrarInformacionCurso("${index}") data-profesor="${nombreCurso[3]}" data-matriculado="false" data-descripcion="${nombreCurso[4]}" data-fecha-inicio="${nombreCurso[5]}" data-fecha-final="${nombreCurso[6]}" id="${index}">${nombreCurso[1]}</button>`;
            });
        }
        else {
            listaCursos.forEach((curso, index) =>{   
                listaCursosMatriculados.forEach(cursoMatriculado =>{
                    if(curso[0]==cursoMatriculado){
                        curso.push('true');
                    }
                });
                curso.push('false');    
            });

            listaCursos.forEach(async (nombreCurso, index) =>{   
                console.log(nombreCurso[7]);
                temp += `<button class="boton-curso" data-idCurso="${nombreCurso[0]}" data-nombre="${nombreCurso[1]}"data-codigo="${nombreCurso[2]}" onclick=mostrarInformacionCurso("${index}") data-profesor="${nombreCurso[3]}" data-matriculado="${nombreCurso[7]}" data-descripcion="${nombreCurso[4]}" data-fecha-inicio="${nombreCurso[5]}" data-fecha-final="${nombreCurso[6]}" id="${index}">${nombreCurso[1]}</button>`;

            });
        }
    }
    res.send(temp);
});

app.get('/cargarCursosMatriculados', async (req, res) => {
    let temp = "";
    const usuarioActual = controlador.getUser().getUserName();
    const listaCursos = await controlador.getCursos();
    const listaCursosMatriculados = await controlador.getCursosMatriculados(usuarioActual);
    const listaResultados = [];
    listaCursos.forEach((curso, index) =>{   
        listaCursosMatriculados.forEach(cursoMatriculado =>{
            if(curso[0]==cursoMatriculado){
                curso.push('true');
            }
        });
        curso.push('false');    
    });

    listaCursos.forEach(async (nombreCurso, index) =>{
        if (nombreCurso[7] == "true"){
            temp += `<input type="submit" class="submit-curso" value ="${nombreCurso[1]}" data-idCurso="${nombreCurso[0]}" data-nombre="${nombreCurso[1]}"data-codigo="${nombreCurso[2]}" onclick=mostrarInformacionCurso("${index}") data-profesor="${nombreCurso[3]}" data-matriculado="${nombreCurso[7]}" data-descripcion="${nombreCurso[3]}" data-fecha-inicio="${nombreCurso[5]}" data-fecha-final="${nombreCurso[6]}" id="${index}"></input>`;
       }   
    })
    console.log(temp);
    res.send(temp);

});


app.get('/cargarCursosDocente', async (req, res) => {
    let temp = "";
    const usuarioActual = controlador.getUser().getNombre();
    const listaCursos = await controlador.getCursos();
    const listaResultados = [];
    listaCursos.forEach((curso, index) =>{   
        if(curso[3]==usuarioActual){
            curso.push('true');
        }
        else{
            curso.push('false');
        }
    });
    console.log(listaCursos);

    listaCursos.forEach(async (nombreCurso, index) =>{
        if (nombreCurso[7] == "true"){
            temp += `<input type="submit" class="submit-curso" value ="${nombreCurso[1]}" data-idCurso="${nombreCurso[0]}" data-nombre="${nombreCurso[1]}"data-codigo="${nombreCurso[2]}" onclick=mostrarInformacionCurso("${index}") data-profesor="${nombreCurso[3]}" data-matriculado="${nombreCurso[7]}" data-descripcion="${nombreCurso[3]}" data-fecha-inicio="${nombreCurso[5]}" data-fecha-final="${nombreCurso[6]}" id="${index}"></input>`;
        }   
    })
    res.send(temp);
});

app.post('/matricularCurso', async (req, res) => {
    const usuarioActual = controlador.getUser().getUserName();
    const idCurso = req.body.idCurso;
    const matriculado = req.body.matriculado;
    if (matriculado == "false") {
        controlador.eliminarCursoRedis(usuarioActual, idCurso);    
    }
    else {
        controlador.agregarCursoMatriculado(usuarioActual, idCurso);
        idCursoActual = req.body.idCurso;
        controlador.agregarEstudianteACurso(idCursoActual);
    }
}); 

app.post('/verCurso', async (req, res) => {

    const idCurso = req.body.idCurso;
    console.log(idCurso);
    idCursoActual=idCurso;
    res.redirect('cursoMatriculado.html');
});

app.post('/verCursoDocente', async (req, res) => {

    const idCurso = req.body.idCurso;
    console.log(idCurso);
    idCursoActual=idCurso;
    res.redirect('curso.html');
});

app.get('/cargarCurso', async (req, res) => {
    const atributosCurso = await controlador.getCurso(idCursoActual); 
    res.json(atributosCurso);
});

app.post('/registrarTema', upload.fields([
    { name: 'documentos', maxCount: 1 },
    { name: 'videos', maxCount: 1 },
    { name: 'imagenes', maxCount: 1 }
]), (req, res) => {
    const nombre = req.body.nombre;
    const texto = req.body.texto;
    const documento = req.files['documentos'][0].filename;
    const video = req.files['videos'][0].filename;
    const imagen = req.files['imagenes'][0].filename;
    controlador.registrarTema(nombre, texto, documento, video, imagen, idCursoActual);
    res.redirect('curso.html');
});


app.post('/guardar_evaluacion', async (req, res) => {
    const evaluacion = req.body.evaluacion;
    const name = req.body.evaluacion['nombreEvaluacion'];
    try {
        const resultado = await controlador.guardar_evaluacionRedis(idCursoActual, evaluacion);
        if (resultado) {
            console.log('La evaluación se guardó con éxito.');
            res.sendStatus(200); 
        } else {
            console.log('Error al guardar la evaluación.');
            res.sendStatus(500); 
        }
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500); 
    }
});


app.get('/obtenerEstudiantes', async (req, res) => {
 
    /*
    const estudiantes = [
        { nombre: "Estudiante 1", edad: 20 },
        { nombre: "Estudiante 2", edad: 22 },
        { nombre: "Estudiante 3", edad: 21 }
    ];
    */

    const estudiantes = await controlador.getEstudiantesCurso(idCursoActual);


    console.log("ESTUDIANTES:"+estudiantes);
    res.send(estudiantes);

});


app.get('/cargarTema', async (req, res) => {
    const temas = await controlador.getTemas(idCursoActual);
    console.log(temas);
    res.send(temas);
});

app.use('/upload', express.static('upload'));

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
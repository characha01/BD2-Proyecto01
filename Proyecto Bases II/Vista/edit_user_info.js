function cargarContenidoPerfil() {
    fetch('/cargarPerfil') // Route to fetch data from the server
    .then(response => response.json())
    .then(data => {
        console.log(data[1]);
        const username = document.getElementById('username');
        username.setAttribute("value", data[0])

        const password = document.getElementById('password');
        password.setAttribute("value", data[1])

        const fullname = document.getElementById('fullname');
        fullname.setAttribute("value", data[1])
        
        const birthdate = document.getElementById('birthdate');
        birthdate.setAttribute("value", data[3])

        const avatar = document.getElementById('avatar');
        let path = "..upload/" + data[4];
        console.log(path);
        avatar.setAttribute("value", path)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
} 
cargarContenidoPerfil();
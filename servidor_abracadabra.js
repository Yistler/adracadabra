const express = require('express');
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname + "/assets")));

const nombres = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian"
];

// Middleware para verificar existencia del usuario
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const usuario = req.params.usuario;
  if (nombres.includes(usuario)) {
    //res.sendFile(__dirname + '/index.html');
    next();
  } else {
    res.sendFile(__dirname + '/assets/who.jpeg');
  }
});

// Ruta específica para la página de inicio
app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para obtener usuarios
app.get('/abracadabra/usuarios', (req, res) => {
  res.send({nombres});
  
});


// Ruta para jugar y mostrar conejo o Voldemort
app.get('/abracadabra/conejo/:n', (req, res) => {
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
  const numero = parseInt(req.params.n);
  if (numero === numeroAleatorio) {
    res.sendFile(__dirname + '/assets/conejito.jpg');
  } else {
    res.sendFile(__dirname + '/assets/voldemort.jpg');
  }
});


//No encuentra la ruta
app.get('*', (req, res) => {
  res.status(404).send(`
  <div style="text-align: center;">
  <h1>Oops! 404 pagina no encontrada</h1>
  <img src="http://localhost:3000/varaMago.jpg" alt="mago"/>
  </div>`);
})

// Iniciar servidor
app.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});


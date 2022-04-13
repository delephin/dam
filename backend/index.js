const express = require('express');
const cors = require('cors');

// definicion de rutas
var rutaDispositivos = require('./routes/dispositivo');

// start up
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/dispositivos', rutaDispositivos);

app.listen(port, () => console.log("Riego Automatizado corriendo correctamente"));
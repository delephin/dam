const express = require('express');
const cors = require('cors');

// definicion de rutas
var rutaDispositivos = require('./routes/dispositivo');
var rutaMediciones = require('./routes/medicion');
var rutaLogs = require('./routes/logRiego');

// start up
const app = express();
const port = process.env.PORT || 3000;

// cors setup

var allowedOrigins = ['http://localhost:8100', 'http://localhost:4200'];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }

            return callback(null, true);
        }
    })
);

app.use(express.json());

app.use('/dispositivos', rutaDispositivos);
app.use('/mediciones', rutaMediciones);
app.use('/logs', rutaLogs);

app.listen(port, () => console.log("Riego Automatizado corriendo correctamente"));
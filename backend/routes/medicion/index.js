var connection = require('../../db');

var express = require('express')
var router = express.Router()

/* 
 * Obtiene todas las mediciones
 *
 * Returns:
 *   - 200 devuelve con exito un listado de mediciones
 */
router.get('/', function(req, res) {

    connection.query('select * from Mediciones', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/* 
 * Obtiene todas las mediciones para un dispositivo
 * ordenados por fecha descendientemente
 * 
 * Returns:
 *   - 200 devuelve con exito un listado de mediciones asociadas a un dispositivo
 */
router.get('/:dispositivoId', function(req, res) {

    connection.query('select m.* from Mediciones m, Dispositivos d where d.dispositivoId = m.dispositivoId ' +
        ' and m.dispositivoId = ' + req.params.dispositivoId + ' order by fecha desc',
        function(err, result, fields) {
            if (err) {
                res.send(err).status(404);
                return;
            }
            res.send(result);
        });
});

/* 
 * Crea una medicion asociada a un dispositivo
 *
 * Returns:
 *   - 200 si la medicion ha sido creado con exito
 *   - 400 bad request
 */
router.post('/', function(req, res) {

    let medicion = req.body;

    connection.query('insert into Mediciones (fecha, valor, dispositivoId) values (STR_TO_DATE(\'' + medicion.fecha + '\', \'%Y-%m-%d %H:%i:%s\'), ' +
        medicion.valor + ', ' + medicion.dispositivoId + ')',
        function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });
});

module.exports = router;
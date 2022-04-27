var connection = require('../../db');

var express = require('express')
var router = express.Router()

/* 
 * Obtiene todos los logs de riego
 *
 * Returns:
 *   - 200 devuelve con exito un listado de logs
 */
router.get('/', function(req, res) {

    connection.query('select * from Log_Riegos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

/* 
 * Obtiene todos los logs de riego asociados a una valvula
 * ordenados por fecha descendientemente
 * 
 * Returns:
 *   - 200 devuelve con exito un listado de logs asociados a una valvula
 */
router.get('/:valvulaId', function(req, res) {

    connection.query('select * from Log_Riegos l, Electrovalvulas e where e.electrovalvulaId = l.electrovalvulaId ' +
        'and e.electrovalvulaId = ' + req.params.valvulaId + ' order by fecha desc',
        function(err, result, fields) {
            if (err) {
                res.send(err).status(404);
                return;
            }
            res.send(result);
        });
});

/* 
 * Obtiene el ultimo log de riego asociados a una valvula
 * 
 * Returns:
 *   - 200 devuelve con exito un log asociado a una valvula
 */
router.get('/:valvulaId/ultimo', function(req, res) {

    connection.query('select * from Log_Riegos l, Electrovalvulas e where e.electrovalvulaId = l.electrovalvulaId ' +
        'and e.electrovalvulaId = ' + req.params.valvulaId + ' order by fecha desc limit 1',
        function(err, result, fields) {
            if (err) {
                res.send(err).status(404);
                return;
            }
            res.send(result);
        });
});

/* 
 * Crea un log de riego asociado a una valvula
 *
 * Returns:
 *   - 200 si el log ha sido creado con exito
 *   - 400 bad request
 */
router.post('/', function(req, res) {

    let logRiego = req.body;

    connection.query('insert into Log_Riegos (apertura, fecha, electrovalvulaId) values (' +
        logRiego.apertura + ', STR_TO_DATE(\'' + logRiego.fecha + '\', \'%Y-%m-%d %H:%i:%s\'), ' + logRiego.electroValvulaId + ')',
        function(err, result, fields) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(result);
        });
});


module.exports = router;
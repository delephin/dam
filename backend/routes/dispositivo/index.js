var connection = require('../../db');

var express = require('express')
var router = express.Router()

/* 
 * Obtiene todos los dispositivos
 *
 * Returns:
 *   - 200 devuelve con exito un listado de dispositivos
 */
router.get('/', function(req, res) {

    connection.query('select * from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = router;
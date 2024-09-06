const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', agregar);
router.delete('/', eliminar);

async function todos (req, res) {
    try{
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }

};

async function uno (req, res) {
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        respuesta.error(req, res, err, 500);
    }

};

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        const mensaje = req.body.id_cliente ? 'Item actualizado con éxito' : 'Item guardado con éxito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
}


async function eliminar (req, res, next) {
    try{
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado', 200);
    }catch(err){
        next(err);
    }

};

module.exports = router;
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas.js');
const usuario = require('./modulos/usuario/rutas.js');
const auth = require('./modulos/auth/rutas.js');
const error = require('./red/errors.js');


const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//configuración de la app
app.set('port', config.app.port)

//rutas
app.use('/api/clientes', clientes);
app.use('/api/usuario', usuario);
app.use('/api/auth', auth);

app.use(error);

module.exports = app;

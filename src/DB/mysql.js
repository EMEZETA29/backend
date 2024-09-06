const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('DB conectada')
        }
    });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function uno(tabla, id_cliente){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_cliente = ?`, [id_cliente], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id_cliente = ?`, [data, data.id_cliente], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

function agregar(tabla, data) {
    if (data && data.id_cliente && data.id_cliente > 0) {
        return actualizar(tabla, data);
    } else {
        return insertar(tabla, data);
    }
}



function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id_cliente = ?`, [data.id_cliente], (error, result) => {
            if (error) {
                return reject(error);
            }
            // Si no se eliminaron filas, devuelve un mensaje adecuado
            if (result.affectedRows === 0) {
                return resolve({ mensaje: 'No se encontró ningún registro con ese ID' });
            }
            return resolve({ mensaje: 'Item eliminado con éxito' });
        });
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    insertar,
    actualizar,
    query
}

const db = require('../../DB/mysql');

const TABLA = 'Clientes';


module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }


    function todos(){
        return db.todos(TABLA);
    }
    
    function uno(id){
        return db.uno(TABLA, id);
    }

    function esEmailValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function agregar(body) {
    // Validación de email
    if (!esEmailValido(body.email)) {
        throw new Error(`Formato de email inválido para ${body.email}`);
    }
    
    return db.agregar(TABLA, body);
    }

    
    function eliminar(body){
        return db.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar,
        esEmailValido

    }


}
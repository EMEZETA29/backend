const db = require('../../DB/mysql');

const TABLA = 'auth';


module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
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

    }
    
    function agregar(TABLA, body) {
        return db.agregar(TABLA, body);
    
    }

    function agregar(data){
        const authData = {
            id: data.id,
            email: data.email,
            password: data.password
        }

        if(data.usuario){
            authData.usuario = data.usuario;
        }

        if(data.password){
            authData.password = data.password;
        }

        return db.agregar(TABLA, authData);
    }



    return {
        agregar,
        esEmailValido

    }

}


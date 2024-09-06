require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JWT_SECRET ||'notasecreta',
    },
    /*
    mysql: {
        host: process.env.MYSQL_HOST || 'aps.pregps.cl',
        user: process.env.MYSQL_USER || 'taller',
        password: process.env.MYSQL_PASSWORD || 'taller2024',
        database: process.env.MYSQL_DB || 'Sticket',
    }
    */

    mysql: {
        host: 'aps.pregps.cl',
        user: 'taller',
        password: 'taller2024',
        database: 'Sticket',
    }

}

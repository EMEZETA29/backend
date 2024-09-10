require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        secret: process.env.JWT_SECRET ||'notasecreta',
    },

    mysql: {
        host: 'aps.pregps.cl',
        user: 'taller',
        password: 'taller2024',
        database: 'Sticket',
    }

}

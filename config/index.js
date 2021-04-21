require('dotenv').config();

const config = {
    port : process.env.PORT || 3001,
    jwt: {
        secret: process.env.JWT_SECRET || 'secreto',
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name:process.env.DB_NAME,
        host:process.env.DB_HOST
    },
    cryptoSecret: process.env.CRYPTO_SECRET,
    admin_pass: process.env.PASSWORD_ADMIN
}

module.exports = config
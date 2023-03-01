const dotenv = require('dotenv');
dotenv.config('../.env');

module.exports = {
    server_port: process.env.SERVER_PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
};

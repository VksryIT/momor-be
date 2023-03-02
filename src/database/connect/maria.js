const mysql = require('mysql2/promise');
const config = require('../../config/index');

const connPool = mysql.createPool({
    host: config.db_host,
    port: 3306,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database,
});

module.exports = connPool;

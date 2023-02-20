import mysql from 'mysql2/promise';
import config from '../../config/index.js';

const connPool = mysql.createPool({
    host: config.db_host,
    port: 3306,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database,
});

export default connPool;

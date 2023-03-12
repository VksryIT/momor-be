import mysql from 'mysql2/promise';
import config from '../../config/index';

const connPool = mysql.createPool({
    host: config.dbHost,
    port: 3306,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
});

export = connPool;

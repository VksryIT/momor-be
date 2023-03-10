import dotenv from 'dotenv';
dotenv.config('../.env');

export default {
    server_port: process.env.SERVER_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
}
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

interface serverConfig {
    serverPort: number;
    dbPort: number;
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbDatabase: string;

}

const config : serverConfig = {
    serverPort: parseInt(process.env.SERVER_PORT) | 3000,
    dbPort: parseInt(process.env.DB_PORT) | 3306,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
}

export = config;

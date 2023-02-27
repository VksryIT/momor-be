import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import session from 'express-session';
import config from './config/index.js';
import passport from 'passport';
import passportConfig from './passport/index.js';
import cors from 'cors';

import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import accountRouter from './routes/accounts.js';

import mySqlStore from 'express-mysql-session';

const MySQLStore = mySqlStore(session);

const app = express();

app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'NmC SecRet',
        resave: true,
        saveUninitialized: false,
        store: new MySQLStore({
            host: config.db_host,
            port: 3306,
            user: config.db_user,
            password: config.db_password,
            database: config.db_database,
            connectionLimit: 100,
        }),
        cookie: { _expires: 10 * 60 * 1000 },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/accounts', accountRouter);

app.listen(config.server_port);

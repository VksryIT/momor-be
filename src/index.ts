import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';

import * as expressSession from 'express-session';
import session from 'express-session';

import cors from 'cors';
import passport from 'passport';
import passportConfig from './passport/index';
import config from './config/index';

import authRouter from './routes/auth';
import userRouter from './routes/users';
import accountRouter from './routes/accounts';
import cardRouter from './routes/cards';

import mySqlStore from 'express-mysql-session';
import { camelcaseKeysMiddleware } from './middlewares/bodyParser';
import { errorHandler } from './middlewares/errorHandler';
const MySQLStore = mySqlStore(expressSession);
const app = express();

app.use(
    cors({
        origin: 'https://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(camelcaseKeysMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'NmC SecRet',
        resave: true,
        saveUninitialized: false,
        store: new MySQLStore({
            host: config.dbHost,
            port: config.dbPort,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            connectionLimit: 100,
        }),
        cookie: { maxAge: 60 * 60 * 1000, sameSite: 'none', secure: true },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.get('/health', (req, res) => {
    res.status(200).send('ok');
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/accounts', accountRouter);
app.use('/cards', cardRouter)
app.use(errorHandler);
export = app;

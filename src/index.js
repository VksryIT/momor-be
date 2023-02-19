import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import session from 'express-session';
import config from './config/index.js';
import passport from 'passport';
import passportConfig from './passport/index.js';

import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';

import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session);

const app = express();

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'NmC SecRet',
    resave: true,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {_expires: (10 * 60 * 1000)},
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(config.server_port);
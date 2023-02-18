import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import session from 'express-session';
import config from './config/index.js';

import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';

// const FileStore = require('session-file-store')(session);

const app = express();

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//     session({
//         resave: false,
//         saveUninitialized: false,
//         secret: 'NmC SecRet',
//         store: new FileStore(),
//     })
// );

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(config.server_port);
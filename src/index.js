const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport/index');
const config = require('./config/index.js');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users.js');
const accountRouter = require('./routes/accounts');

const mySqlStore = require('express-mysql-session');
const MySQLStore = mySqlStore(session);
const app = express();

app.use(
    cors({
        origin: 'https://localhost:3000',
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'NmC SecRet',
        resave: true,
        saveUninitialized: false,
        store: new MySQLStore({
            host: config.db_host,
            port: config.db_port,
            user: config.db_user,
            password: config.db_password,
            database: config.db_database,
            connectionLimit: 100,
        }),
        cookie: { _expires: 10 * 60 * 1000, sameSite: 'none', secure: true },
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

module.exports = app;

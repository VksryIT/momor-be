import passport from 'passport';
import LocalStrategy from 'passport-local';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import * as AuthService from '../services/AuthService';

export = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                session: true,
                passReqToCallback: false,
            },
            async (username, password, done) => {
                try {
                    const { userId, isPassWordMatch } =
                        await AuthService.checkLogin(username, password);
                    if (userId && isPassWordMatch)
                        return done(null, {
                            userId: userId,
                            userName: username,
                        });

                    if (userId && isPassWordMatch === false)
                        return done(
                            {
                                code: statusCode.UNPROCESSABLE,
                                message: message.USER_WRONG_PASSWORD,
                            },
                            false,
                        );
                    if (userId === undefined)
                        return done(
                            {
                                code: statusCode.NOT_FOUND,
                                message: message.USER_NOT_EXISTS,
                            },
                            false,
                        );
                } catch (error) {
                    done(error);
                }
            },
        ),
    );
};

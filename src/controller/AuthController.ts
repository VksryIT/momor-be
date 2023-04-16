import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { throwNewHttpError } from '../middlewares/errorHandler';

const authLogin = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('local', (authError: any, user: any) => {
        try {
            if (authError) {
                throwNewHttpError(authError.status, authError.code);
            }
            return req.login(user, (loginError) => {
                if (loginError) {
                    throwNewHttpError(loginError.status, loginError.code);
                }
                return res.status(statusCode.OK).send({ data: user });
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })(req, res, next);

const authLogout = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            req.logout((err) => {
                if (err) {
                    throwNewHttpError(
                        statusCode.INTERNAL_SERVER_ERROR,
                        message.ABNORMAL_LOGOUT,
                    );
                }
                return res.status(statusCode.OK).send();
            });
        } else {
            res.status(statusCode.NO_CONTENT);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { authLogin, authLogout };

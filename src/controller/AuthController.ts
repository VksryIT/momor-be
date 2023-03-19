import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { throwNewHttpError } from '../middlewares/errorHandler';

const authLogin = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate('local', (authError: any, user: any) => {
        try {
            if (authError) {
                throwNewHttpError(authError.code, authError.message);
            }
            return req.login(user, (loginError) => {
                if (loginError) {
                    throwNewHttpError(loginError.code, loginError);
                }
                return res
                    .status(statusCode.OK)
                    .send(
                        utils.sendResponse(
                            statusCode.OK,
                            message.USER_LOGIN_SUCCESS,
                            user,
                        ),
                    );
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
                        message.INTERNAL_SERVER_ERROR,
                    );
                }
                return res
                    .status(statusCode.OK)
                    .send(
                        utils.sendResponse(
                            statusCode.OK,
                            message.USER_LOGOUT_SUCCESS,
                        ),
                    );
            });
        } else {
            throwNewHttpError(
                statusCode.NOT_FOUND,
                message.USER_NO_USER_TO_LOGOUT,
            );
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { authLogin, authLogout };

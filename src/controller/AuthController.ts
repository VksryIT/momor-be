import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const authLogin = async (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
        'local',
        (authError: any, user: any, next: NextFunction) => {
            try {
                if (authError) {
                    return res
                        .status(authError.code)
                        .send(
                            utils.sendResponse(
                                authError.code,
                                authError.message,
                            ),
                        );
                }
                return req.login(user, (loginError) => {
                    if (loginError) {
                        return res.status(loginError.code).send(loginError);
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
        },
    )(req, res, next);

const authLogout = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            req.logout((err) => {
                if (err) {
                    return res
                        .status(statusCode.INTERNAL_SERVER_ERROR)
                        .send(statusCode.INTERNAL_SERVER_ERROR);
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
            return res
                .status(statusCode.NOT_FOUND)
                .send(
                    utils.sendResponse(
                        statusCode.NOT_FOUND,
                        message.USER_NO_USER_TO_LOGOUT,
                    ),
                );
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { authLogin, authLogout };

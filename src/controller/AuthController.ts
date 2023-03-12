import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';
import passport from 'passport';

const authLogin = async (req: any, res: any, next: any) =>
    passport.authenticate('local', (authError: any, user: any) => {
        if (req.user) {
            return res
                .status(statusCode.OK)
                .send(utils.success(statusCode.OK, message.USER_LOGIN_ALREADY));
        }
        if (authError) {
            return res
                .status(authError.code)
                .send(
                    utils.fail(
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
                .send(utils.success(statusCode.OK, message.USER_LOGIN_SUCCESS));
        });
    })(req, res, next);

const authLogout = (req, res) => {
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
                    utils.success(statusCode.OK, message.USER_LOGOUT_SUCCESS),
                );
        });
    } else {
        return res
            .status(statusCode.NOT_FOUND)
            .send(
                utils.fail(
                    statusCode.NOT_FOUND,
                    message.USER_NO_USER_TO_LOGOUT,
                ),
            );
    }
};

export { authLogin, authLogout };

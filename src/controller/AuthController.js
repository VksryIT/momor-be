import message from '../modules/responseMessage.js';
import statusCode from '../modules/statusCode.js';
import utils from '../modules/utils.js';
import passport from 'passport';

const authLogin = async (req, res, next) =>
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return res
                .status(statusCode.INTERNAL_SERVER_ERROR)
                .send(
                    utils.fail(
                        statusCode.INTERNAL_SERVER_ERROR,
                        message.INTERNAL_SERVER_ERROR,
                    ),
                );
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                return res.status(statusCode.UNAUTHORIZED).send(info);
            }
            return res
                .status(statusCode.OK)
                .send(utils.success(statusCode.OK, message.USER_LOGIN_SUCCESS));
        });
    })(req, res, next);

export default {
    authLogin,
};

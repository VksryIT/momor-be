const message = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const utils = require('../modules/utils');
const passport = require('passport');

const authLogin = async (req, res, next) =>
    passport.authenticate('local', (authError, user, info) => {
        if (req.user) {
            return res
                .status(statusCode.OK)
                .send(utils.success(statusCode.OK, message.USER_LOGIN_ALREADY));
        }
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
                return res.status(info.code).send(info);
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

module.exports = {
    authLogin,
    authLogout,
};

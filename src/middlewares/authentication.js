import message from '../modules/responseMessage.js';
import statusCode from '../modules/statusCode.js';
import util from '../modules/utils.js';

const isAuthenticated = (req, res, next) => {
    if (req.session.passport?.user === undefined) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.fail(statusCode.UNAUTHORIZED, message.NOT_AUTHENTICATED),
            );
    } else next();
};

export default {
    isAuthenticated,
};

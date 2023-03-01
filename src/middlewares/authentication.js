const message = require('../modules/responseMessage.js');
const statusCode = require('../modules/statusCode.js');
const util = require('../modules/utils.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.passport?.user === undefined) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.fail(statusCode.UNAUTHORIZED, message.NOT_AUTHENTICATED),
            );
    } else next();
};

module.exports = {
    isAuthenticated,
};

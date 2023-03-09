const message = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const utils = require('../modules/utils');

const throwNewError = (errorCode, errorName, errorMsg) => {
    const newError = new Error(errorMsg ?? 'error occured');
    newError.code = errorCode;
    newError.name = errorName;
    throw newError;
};

const errorCodeList = [
    statusCode.BAD_REQUEST,
    statusCode.UNAUTHORIZED,
    statusCode.FORBIDDEN,
    statusCode.NOT_FOUND,
    statusCode.CONFLICT,
    statusCode.UNPROCESSABLE,
    statusCode.DB_ERROR,
];

const errorResponseHandler = (error, res) => {
    if (errorCodeList.includes(error.code)) {
        res.status(error.code).send(utils.fail(error.code, error.message));
    } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + ` - ${error.message}`,
            ),
        );
    }
};

module.exports = {
    throwNewError,
    errorResponseHandler,
};

const message = require('../modules/responseMessage.js');
const statusCode = require('../modules/statusCode.js');
const utils = require('../modules/utils.js');
const UserService = require('../services/UserService.js');

const createUser = async (req, res) => {
    const userInfo = req.body;

    try {
        UserService.checkCreateUserValid(userInfo);
        const isUserNameExists = await UserService.checkIfUserNameExists(
            userInfo.username,
        );
        if (isUserNameExists) {
            return res
                .status(statusCode.CONFLICT)
                .send(
                    utils.fail(
                        statusCode.CONFLICT,
                        message.USER_ALREADY_EXISTS,
                    ),
                );
        }
        await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send(
            utils.success(statusCode.CREATED, message.USER_POST_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'BadRequest') {
            res.status(error.code).send(utils.fail(error.code, error.message));
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(
                utils.fail(
                    statusCode.INTERNAL_SERVER_ERROR,
                    message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
                ),
            );
        }
    }
};

module.exports = {
    createUser,
};

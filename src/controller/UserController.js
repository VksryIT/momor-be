import message from '../modules/responseMessage.js';
import statusCode from '../modules/statusCode.js';
import utils from '../modules/utils.js';
import UserService from '../services/UserService.js';

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
        const user = await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send(
            utils.success(statusCode.CREATED, message.USER_POST_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'BadRequest') {
            res.status(error.code).send(
                utils.fail(
                    error.code,
                    error.message,
                ),
            );
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

export default {
    createUser,
};

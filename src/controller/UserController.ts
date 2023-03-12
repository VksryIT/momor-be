import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';
import * as UserService from '../services/UserService';

const createUser = async (req: any, res: any) => {
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
                    utils.sendResponse(
                        statusCode.CONFLICT,
                        message.USER_ALREADY_EXISTS,
                    ),
                );
        }
        await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send(
            utils.sendResponse(statusCode.CREATED, message.USER_POST_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'BadRequest') {
            res.status(error.code).send(
                utils.sendResponse(statusCode.BAD_REQUEST, error.message),
            );
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(
                utils.sendResponse(
                    statusCode.INTERNAL_SERVER_ERROR,
                    message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
                ),
            );
        }
    }
};

export { createUser };

import message from "../modules/responseMessage.js";
import statusCode from "../modules/statusCode.js";
import utils from "../modules/utils.js";
import UserService from '../services/UserService.js';


const createUser = async (req, res) => {
    const userInfo = req.body;

    try {
        const user = await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send(utils.success(statusCode.CREATED, message.USER_POST_SUCCESS));

    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    };
};

export default {
    createUser,
}
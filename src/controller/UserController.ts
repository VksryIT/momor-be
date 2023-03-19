import { NextFunction, Request, Response } from 'express';
import { throwNewHttpError } from '../middlewares/errorHandler';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';
import * as UserService from '../services/UserService';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body;

    try {
        UserService.checkCreateUserValid(userInfo);
        const isUserNameExists = await UserService.checkIfUserNameExists(
            userInfo.username,
        );
        if (isUserNameExists) throwNewHttpError(statusCode.CONFLICT, message.USER_ALREADY_EXISTS);
        await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send(
            utils.sendResponse(statusCode.CREATED, message.USER_POST_SUCCESS),
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { createUser };

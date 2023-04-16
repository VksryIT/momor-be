import { NextFunction, Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import * as UserService from '../services/UserService';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body;

    try {
        await UserService.createUser(userInfo);
        res.status(statusCode.CREATED).send();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { createUser };

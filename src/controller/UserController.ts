import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import asyncWrapper from '../modules/asyncWrapper';

import * as UserService from '../services/UserService';

const createUser = asyncWrapper(async (req: Request, res: Response) => {
    const userInfo = req.body;
    await UserService.createUser(userInfo);
    res.status(statusCode.CREATED).send();
});

export { createUser };

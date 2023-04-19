import { Request, Response } from 'express';
import asyncWrapper from '../modules/asyncWrapper';
import statusCode from '../modules/statusCode';

import * as UserService from '../services/UserService';
import { IUserCreateInfo } from '../types';

const createUser = asyncWrapper(async (req: Request, res: Response) => {
    const userInfo: IUserCreateInfo = req.body;
    await UserService.createUser(userInfo);
    res.status(statusCode.CREATED).send();
});

export { createUser };


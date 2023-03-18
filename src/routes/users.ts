import express, { NextFunction, Request, Response } from 'express';
import * as authentication from '../middlewares/authentication';
import * as UserController from '../controller/UserController';
import * as AccountController from '../controller/AccountController';
import { ISaveAccountInfo } from '../types';

const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    // implement singup proces...
    UserController.createUser(req, res, next);
});

router.post(
    '/:userId/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req: Request, res: Response, next: NextFunction) => {
        AccountController.createUpdateAccount(req, res, next);
    },
);

router.get(
    '/:userId/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req: Request, res: Response, next: NextFunction) => {
        AccountController.getUserAccounts(req, res, next);
    },
);

router.delete(
    '/:userId/accounts/:accountId',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req: Request, res: Response, next: NextFunction) => {
        AccountController.deleteUserAccount(req, res, next);
    },
);

export = router;

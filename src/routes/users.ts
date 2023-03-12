import express from 'express';
import * as authentication from '../middlewares/authentication';
import * as UserController from '../controller/UserController';
import * as AccountController from '../controller/AccountController';

const router = express.Router();

router.post('/', (req, res) => {
    // implement singup proces...
    UserController.createUser(req, res);
});

router.post(
    '/:userId/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.createAccount(req, res);
    },
);

router.get(
    '/:userId/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.getUserAccounts(req, res);
    },
);

router.put(
    '/:userId/accounts/:accountId',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.updateUserAccount(req, res);
    },
);

router.delete(
    '/:userId/accounts/:accountId',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.deleteUserAccount(req, res);
    },
);

export = router;

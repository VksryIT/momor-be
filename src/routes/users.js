const express = require('express');
const authentication = require('../middlewares/authentication');
const UserController = require('../controller/UserController');
const AccountController = require('../controller/AccountController');

const router = express.Router();

router.post('/', (req, res) => {
    // implement singup proces...
    UserController.createUser(req, res);
});

router.post(
    '/:userNo/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.createAccount(req, res);
    },
);

router.get(
    '/:userNo/accounts',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.getUserAccounts(req, res);
    },
);

router.put(
    '/:userNo/accounts/:accountNo',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.updateUserAccount(req, res);
    },
);

router.delete(
    '/:userNo/accounts/:accountNo',
    authentication.isAuthenticated,
    authentication.isSameUserRequest,
    (req, res) => {
        AccountController.deleteUserAccount(req, res);
    },
);

module.exports = router;

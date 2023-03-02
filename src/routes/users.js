const express = require('express');
const authentication = require('../middlewares/authentication.js');
const UserController = require('../controller/UserController.js');
const AccountController = require('../controller/AccountController.js');

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

module.exports = router;

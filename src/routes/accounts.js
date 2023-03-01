const express = require('express');
const AccountController = require('../controller/AccountController.js');
const authentication = require('../middlewares/authentication.js');

const router = express.Router();

// create user account
router.post('/', authentication.isAuthenticated, (req, res) => {
    AccountController.createAccount(req, res);
});

router.get('/:userNo', authentication.isSameUserRequest, (req, res) => {
    AccountController.getUserAccounts(req, res);
});

router.get('/asset-types', authentication.isAuthenticated, (req, res) => {
    AccountController.getAccountAssetTypes(req, res);
});

module.exports = router;

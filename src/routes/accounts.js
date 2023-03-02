const express = require('express');
const AccountController = require('../controller/AccountController.js');
const authentication = require('../middlewares/authentication.js');

const router = express.Router();

router.get('/asset-types', authentication.isAuthenticated, (req, res) => {
    AccountController.getAccountAssetTypes(req, res);
});

module.exports = router;

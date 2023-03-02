const express = require('express');
const AccountController = require('../controller/AccountController.js');

const router = express.Router();

router.get('/asset-types', (req, res) => {
    AccountController.getAccountAssetTypes(req, res);
});

module.exports = router;

const express = require('express');
const AuthController = require('../controller/AuthController');
const router = express.Router();

router.post('/login', (req, res, next) => {
    AuthController.authLogin(req, res, next);
});

router.get('/logout', (req, res) => {
    AuthController.authLogout(req, res);
});

module.exports = router;

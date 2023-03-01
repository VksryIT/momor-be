const express = require('express');
const UserController = require('../controller/UserController.js');
const router = express.Router();

router.post('/', (req, res) => {
    // implement singup proces...
    UserController.createUser(req, res);
});

module.exports = router;

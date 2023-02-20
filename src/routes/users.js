import express from 'express';

import UserController from '../controller/UserController.js';

const router = express.Router();

router.post('/', (req, res, next) => {
    // implement singup proces...
    UserController.createUser(req, res);
});

export default router;

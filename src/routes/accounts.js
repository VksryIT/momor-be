import express from 'express';
import AccountController from '../controller/AccountController.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

// create user account
router.post('/', authentication.isAuthenticated, (req, res) => {
    AccountController.createAccount(req, res);
});

export default router;

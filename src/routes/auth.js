import express from 'express';
import AuthController from '../controller/AuthController.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
    AuthController.authLogin(req, res, next);
});

router.get('/logout', (req, res) => {
    AuthController.authLogout(req, res);
});

export default router;

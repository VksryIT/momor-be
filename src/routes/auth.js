import express from 'express';
import AuthController from '../controller/AuthController.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
    AuthController.authLogin(req, res, next);
});

export default router;


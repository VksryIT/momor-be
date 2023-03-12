import express from 'express';
import * as AuthController from '../controller/AuthController';
const router = express.Router();

router.post('/login', (req, res, next) => {
    AuthController.authLogin(req, res, next);
});

router.get('/logout', (req, res) => {
    AuthController.authLogout(req, res);
});

export = router;

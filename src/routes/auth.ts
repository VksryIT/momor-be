import express, { NextFunction, Request, Response } from 'express';
import * as AuthController from '../controller/AuthController';
import statusCode from '../modules/statusCode';
const router = express.Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        req.logout((err) => {
            if (err) {
                return res
                    .status(statusCode.INTERNAL_SERVER_ERROR)
                    .send(statusCode.INTERNAL_SERVER_ERROR);
            }
        });
    }
    AuthController.authLogin(req, res, next);
});

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    AuthController.authLogout(req, res, next);
});

export = router;

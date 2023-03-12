import express from 'express';
import * as AuthController from '../controller/AuthController';
import statusCode from '../modules/statusCode';
const router = express.Router();

router.post('/login', (req: any, res: any, next) => {
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

router.get('/logout', (req: any, res: any) => {
    AuthController.authLogout(req, res);
});

export = router;

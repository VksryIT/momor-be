import express, { NextFunction, Request, Response } from 'express';
import * as AccountController from '../controller/AccountController';

const router = express.Router();

router.get('/asset-types', (req: any, res: any, next) => {
    AccountController.getAccountAssetTypes(req, res, next);
});

router.get('/banks', (req: Request, res: Response, next: NextFunction) => {
    AccountController.getAccountBanks(req, res, next);
})

export = router;

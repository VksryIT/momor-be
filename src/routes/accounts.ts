import express from 'express';
import * as AccountController from '../controller/AccountController';

const router = express.Router();

router.get('/asset-types', (req: any, res: any, next) => {
    AccountController.getAccountAssetTypes(req, res, next);
});

export = router;

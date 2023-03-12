import express from 'express';
import * as AccountController from '../controller/AccountController';

const router = express.Router();

router.get('/asset-types', (req: any, res: any) => {
    AccountController.getAccountAssetTypes(req, res);
});

export = router;

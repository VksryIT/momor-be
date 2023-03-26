import express from 'express';
import * as CardController from '../controller/CardController';

const router = express.Router();

router.post('/companies', (req: any, res: any, next) => {
    CardController.createCardCompnay(req, res, next);
});

router.get('/companies', (req: any, res: any, next) => {
    CardController.getCardCompanies(req, res, next);
});


export = router;

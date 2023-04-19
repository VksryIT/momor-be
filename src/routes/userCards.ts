import express from 'express';
import * as CardController from '../controller/CardController';

const router = express.Router();

router.post('', (req: any, res: any, next) => {
    CardController.createUserCard(req, res, next);
});

router.get('', (req: any, res: any, next) => {
    CardController.getUserCards(req, res, next);
});


export = router;

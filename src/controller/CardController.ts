import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import asyncWrapper from '../modules/asyncWrapper';

import * as CardService from '../services/CardService';
import { ISaveCardCompnayInfo } from '../types/cards';

const createUserCard = asyncWrapper(async (req: Request, res: Response) => {
    const userCardInfo = req.body;
    await CardService.createCardCompany(userCardInfo);
    res.status(statusCode.CREATED).send();
});

const createCardCompnay = asyncWrapper(async (req: Request, res: Response) => {
    const companyInfo: ISaveCardCompnayInfo = req.body;
    await CardService.createCardCompany(companyInfo);
    res.status(statusCode.CREATED).send();
});

const getCardCompanies = asyncWrapper(async (req: Request, res: Response) => {
    const cardCompanies = await CardService.getCardCompanies();
    res.status(statusCode.OK).send({ data: cardCompanies });
});

const getUserCards = asyncWrapper(async (req: Request, res: Response) => {
    const userCards = await CardService.getUserCards(
        Number(req.params.userId),
    );
    res.status(statusCode.OK).send({ data: userCards });
});

export { createUserCard, getCardCompanies, createCardCompnay, getUserCards };

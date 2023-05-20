import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import asyncWrapper from '../modules/asyncWrapper';

import * as CardService from '../services/CardService';
import { ICardInfo, ISaveCardCompnayInfo, ISaveCardInfo } from '../types/cards';

const createUserCard = asyncWrapper(async (req: Request, res: Response) => {
    let userCardInfo: ISaveCardInfo = req.body;
    const userId = Number(req.params.userId);
    
    userCardInfo.addCardData?.forEach((item: ICardInfo) => {
        item.userId = userId;
    });
    
    userCardInfo.modifyCardData?.forEach((item: ICardInfo) => {
        item.userId = userId;
    });
    
    await CardService.createUpdateCard(userCardInfo);
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
    const userCards = await CardService.getUserCards(Number(req.params.userId));
    res.status(statusCode.OK).send({ data: userCards });
});

export { createUserCard, getCardCompanies, createCardCompnay, getUserCards };

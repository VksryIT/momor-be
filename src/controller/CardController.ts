import { NextFunction, Request, Response } from 'express';
import statusCode from '../modules/statusCode';

import * as CardService from '../services/CardService';
import { ISaveCardCompnayInfo } from '../types/cards';

const createUserCard = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let userCardInfo = req.body;
    let companyInfo: ISaveCardCompnayInfo = req.body;
    try {
        await CardService.createCardCompany(companyInfo);

        res.status(statusCode.CREATED).send();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const createCardCompnay = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let companyInfo: ISaveCardCompnayInfo = req.body;
    try {
        await CardService.createCardCompany(companyInfo);

        res.status(statusCode.CREATED).send();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getCardCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const cardCompanies = await CardService.getCardCompanies();
        res.status(statusCode.OK).send({ data: cardCompanies });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getUserCards = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const cardCompanies = await CardService.getUserCards(
            parseInt(req.params.userId),
        );
        res.status(statusCode.OK).send({ data: cardCompanies });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { createUserCard, getCardCompanies, createCardCompnay, getUserCards };

import { NextFunction, Request, Response } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';

import * as CardService from '../services/CardService';
import { ISaveCardCompnayInfo } from '../types/cards';

const createCardCompnay = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let companyInfo: ISaveCardCompnayInfo = req.body;
    try {
        await CardService.createCardCompany(companyInfo);

        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.CARD_COMPANY_POST_SUCCESS),
        );
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
        res.status(statusCode.OK).send(
            utils.sendResponse(
                statusCode.OK,
                message.CARD_COMPANY_GET_SUCCESS,
                cardCompanies,
            ),
        );
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export { getCardCompanies, createCardCompnay };

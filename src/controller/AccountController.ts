import { NextFunction, Request, Response } from 'express';
import statusCode from '../modules/statusCode';

import * as AccountService from '../services/AccountService';
import { IAccountData, ISaveAccountInfo } from '../types';

const createUpdateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let accountInfo: ISaveAccountInfo = req.body;
    try {
        const userId = parseInt(req.params.userId);

        accountInfo.addAccountData?.forEach((item: IAccountData) => {
            item.userId = userId;
        });

        accountInfo.modifyAccountData?.forEach((item: IAccountData) => {
            item.userId = userId;
        });
        await AccountService.createUpdateAccount(accountInfo);
        res.status(statusCode.OK).send();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getUserAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userAccounts = await AccountService.getUserAccounts(
            parseInt(req.params.userId),
        );
        res.status(statusCode.OK).send({ data: userAccounts });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const deleteUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const accountId = parseInt(req.params.accountId);
        await AccountService.deleteAccount(accountId);
        res.status(statusCode.OK).send();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAccountAssetTypes = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const assetTypes = await AccountService.getAssetTypes();
        res.status(statusCode.OK).send({ data: assetTypes });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export {
    getUserAccounts,
    deleteUserAccount,
    getAccountAssetTypes,
    createUpdateAccount,
};

import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import asyncWrapper from '../modules/asyncWrapper';

import * as AccountService from '../services/AccountService';
import { IAccountData, ISaveAccountInfo } from '../types';

const createUpdateAccount = asyncWrapper(
    async (req: Request, res: Response) => {
        let accountInfo: ISaveAccountInfo = req.body;
        const userId = Number(req.params.userId);

        accountInfo.addAccountData?.forEach((item: IAccountData) => {
            item.userId = userId;
        });

        accountInfo.modifyAccountData?.forEach((item: IAccountData) => {
            item.userId = userId;
        });
        await AccountService.createUpdateAccount(accountInfo);
        res.status(statusCode.OK).send();
});

const getUserAccounts = asyncWrapper(async (req: Request, res: Response) => {
    const userAccounts = await AccountService.getUserAccounts(
        Number(req.params.userId),
    );
    res.status(statusCode.OK).send({ data: userAccounts });
});

const deleteUserAccount = asyncWrapper(async (req: Request, res: Response) => {
    const [accountId, userId] = [req.params.accountId, req.params.userId].map(
        Number,
    );
    await AccountService.deleteAccount(accountId, userId);
    res.status(statusCode.OK).send();
});

const getAccountAssetTypes = asyncWrapper(
    async (req: Request, res: Response) => {
        const assetTypes = await AccountService.getAssetTypes();
        res.status(statusCode.OK).send({ data: assetTypes });
});

export {
    getUserAccounts,
    deleteUserAccount,
    getAccountAssetTypes,
    createUpdateAccount,
};

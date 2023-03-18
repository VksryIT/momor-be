import { NextFunction, Request, Response } from 'express';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';

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

        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.ACCOUNT_POST_SUCCESS),
        );
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
        const assetTypes = await AccountService.getUserAccounts(
            parseInt(req.params.userId),
        );
        res.status(statusCode.OK).send(
            utils.sendResponse(
                statusCode.OK,
                message.ACCOUNT_GET_SUCCESS,
                assetTypes,
            ),
        );
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
        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.ACCOUNT_DELETE_SUCCESS),
        );
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
        res.status(statusCode.OK).send(
            utils.sendResponse(
                statusCode.OK,
                message.ACCOUNT_ASSET_TYPE_SUCCESS,
                assetTypes,
            ),
        );
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

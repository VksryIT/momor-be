import { Request, Response } from 'express';
import { errorResponseHandler } from '../middlewares/errorHandler';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';

import * as AccountService from '../services/AccountService';
import { IAccountData, ISaveAccountInfo } from '../types';

const createUpdateAccount = async (req: Request, res: Response) => {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.sendResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

const getUserAccounts = async (req: Request, res: Response) => {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.sendResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

const deleteUserAccount = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.accountId);
        await AccountService.deleteAccount(accountId);
        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.ACCOUNT_DELETE_SUCCESS),
        );
    } catch (error) {
        console.error(error);
        if (error.name === 'NotFound') {
            res.status(error.code).send(
                utils.sendResponse(error.code, error.message),
            );
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(
                utils.sendResponse(
                    statusCode.INTERNAL_SERVER_ERROR,
                    message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
                ),
            );
        }
    }
};

const getAccountAssetTypes = async (req: Request, res: Response) => {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.sendResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

export {
    getUserAccounts,
    deleteUserAccount,
    getAccountAssetTypes,
    createUpdateAccount,
};

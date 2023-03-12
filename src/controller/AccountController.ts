import { errorResponseHandler } from '../middlewares/errorHandler';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import utils from '../modules/utils';

import * as AccountService from '../services/AccountService';

const createAccount = async (req: any, res: any) => {
    let accountInfo = req.body;
    const userId = parseInt(req.params.userId);
    accountInfo.user_id = userId;
    try {
        await AccountService.createAccount(accountInfo);
        res.status(statusCode.CREATED).send(
            utils.sendResponse(statusCode.CREATED, message.ACCOUNT_POST_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'BadRequest') {
            res.status(error.code).send(utils.sendResponse(error.code, error.message));
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

const getUserAccounts = async (req: any, res: any) => {
    try {
        const assetTypes = await AccountService.getUserAccounts(
            req.params.userId,
        );
        res.status(statusCode.OK).send(
            utils.sendResponse(
                statusCode.OK,
                message.ACCOUNT_GET_SUCCESS,
                assetTypes,
            ),
        );
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.sendResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

const updateUserAccount = async (req: any, res: any) => {
    try {
        let accountInfo = req.body;
        const accountNo = parseInt(req.params.accountNo);
        await AccountService.updateAccount(accountNo, accountInfo);
        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.ACCOUNT_PUT_SUCCESS),
        );
    } catch (error) {
        errorResponseHandler(error, res);
        // res.status(statusCode.INTERNAL_SERVER_ERROR).send(
        //     utils.sendResponse(
        //         statusCode.INTERNAL_SERVER_ERROR,
        //         message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
        //     ),
        // );
    }
};

const deleteUserAccount = async (req: any, res: any) => {
    try {
        const accountNo = parseInt(req.params.accountNo);
        await AccountService.deleteAccount(accountNo);
        res.status(statusCode.OK).send(
            utils.sendResponse(statusCode.OK, message.ACCOUNT_DELETE_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'NotFound') {
            res.status(error.code).send(utils.sendResponse(error.code, error.message));
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

const getAccountAssetTypes = async (req: any, res: any) => {
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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.sendResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

export {
    createAccount,
    getUserAccounts,
    updateUserAccount,
    deleteUserAccount,
    getAccountAssetTypes,
};

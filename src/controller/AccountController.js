const message = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const utils = require('../modules/utils');

const AccountService = require('../services/AccountService');

const createAccount = async (req, res) => {
    let accountInfo = req.body;
    const userNo = parseInt(req.params.userNo);
    accountInfo.user_no = userNo;
    try {
        await AccountService.createAccount(accountInfo);
        res.status(statusCode.CREATED).send(
            utils.success(statusCode.CREATED, message.ACCOUNT_POST_SUCCESS),
        );
    } catch (error) {
        if (error.name === 'BadRequest') {
            res.status(error.code).send(utils.fail(error.code, error.message));
        } else {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(
                utils.fail(
                    statusCode.INTERNAL_SERVER_ERROR,
                    message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
                ),
            );
        }
    }
};

const getUserAccounts = async (req, res) => {
    try {
        const assetTypes = await AccountService.getUserAccounts(
            req.params.userNo,
        );
        res.status(statusCode.OK).send(
            utils.success(
                statusCode.OK,
                message.ACCOUNT_GET_SUCCESS,
                assetTypes,
            ),
        );
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

const getAccountAssetTypes = async (req, res) => {
    try {
        const assetTypes = await AccountService.getAssetTypes();
        res.status(statusCode.OK).send(
            utils.success(
                statusCode.OK,
                message.ACCOUNT_ASSET_TYPE_SUCCESS,
                assetTypes,
            ),
        );
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            utils.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR + `- ${error.message}`,
            ),
        );
    }
};

module.exports = {
    createAccount,
    getUserAccounts,
    getAccountAssetTypes,
};

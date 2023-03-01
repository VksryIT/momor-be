const message = require('../modules/responseMessage.js');
const statusCode = require('../modules/statusCode.js');
const utils = require('../modules/utils.js');

const AccountService = require('../services/AccountService.js');

const createAccount = async (req, res) => {
    const accountInfo = req.body;

    try {
        await AccountService.createAccount(accountInfo);
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
    getAccountAssetTypes,
};

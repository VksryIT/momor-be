const connectionPool = require('../database/connect/maria');
const utils = require('../database/utils/index');
const { throwNewError } = require('../middlewares/errorHandler');
const statusCode = require('../modules/statusCode');

const createAccount = async (accountInfo) => {
    let conn;
    try {
        conn = await connectionPool.getConnection();
        await conn.beginTransaction();
        await conn.execute(
            utils.buildInsertQuery('user_accounts', accountInfo),
        );
        await conn.commit();
    } catch (error) {
        if (conn) await conn.rollback();
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const getUserAccounts = async (userNo) => {
    let conn;
    try {
        conn = await connectionPool.getConnection();
        const result = await conn.execute(
            `SELECT * FROM user_accounts WHERE user_no=${userNo}`,
        );
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const updateAccount = async (accountNo, accountInfo) => {
    let conn;
    try {
        const conditionObj = { account_no: accountNo };
        conn = await connectionPool.getConnection();
        const accountExists = await conn.execute(
            utils.buildDataExistQuery('user_accounts', conditionObj),
        );
        if (accountExists[0][0].count === 0) {
            throwNewError(
                statusCode.NOT_FOUND,
                'NotFound',
                'User account not exists',
            );
        }
        await conn.beginTransaction();
        await conn.execute(
            utils.buildUpdateQuery('user_accounts', accountInfo, conditionObj),
        );
        await conn.commit();
    } catch (error) {
        if (conn) await conn.rollback();
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const deleteAccount = async (accountNo) => {
    let conn;
    try {
        const conditionObj = { account_no: accountNo };
        conn = await connectionPool.getConnection();
        const accountExists = await conn.execute(
            utils.buildDataExistQuery('user_accounts', conditionObj),
        );
        if (accountExists[0][0].count === 0) {
            throwNewError(
                statusCode.NOT_FOUND,
                'NotFound',
                'User account not exists',
            );
        }
        await conn.beginTransaction();
        await conn.execute(
            utils.buildDeleteQuery('user_accounts', conditionObj),
        );
        await conn.commit();
    } catch (error) {
        if (conn) await conn.rollback();
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const getAssetTypes = async () => {
    let conn;
    try {
        conn = await connectionPool.getConnection();
        const result = await conn.execute('SELECT * FROM account_asset_type');
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

module.exports = {
    createAccount,
    getUserAccounts,
    updateAccount,
    deleteAccount,
    getAssetTypes,
};

import { PoolConnection } from 'mysql2/promise';
import connectionPool from '../database/connect/maria';
import * as utils from '../database/utils/index';
import { throwNewError } from '../middlewares/errorHandler';
import statusCode from '../modules/statusCode';

const createAccount = async (accountInfo: Object) => {
    let conn: PoolConnection;
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

const getUserAccounts = async (userId: number) => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        const result = await conn.execute(
            `SELECT * FROM user_accounts WHERE user_id=${userId}`,
        );
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const updateAccount = async (accountNo: number, accountInfo: Object) => {
    let conn: PoolConnection;
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

const deleteAccount = async (accountNo: Number) => {
    let conn: PoolConnection;
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
    let conn: PoolConnection;
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

export {
    createAccount,
    getUserAccounts,
    updateAccount,
    deleteAccount,
    getAssetTypes,
};

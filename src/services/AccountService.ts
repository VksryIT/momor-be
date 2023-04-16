import { PoolConnection } from 'mysql2/promise';
import connectionPool from '../database/connect/maria';
import * as utils from '../database/utils/index';
import { throwNewHttpError } from '../middlewares/errorHandler';
import statusCode from '../modules/statusCode';
import { formatDate } from '../modules/utils';
import { IAccountData, ISaveAccountInfo } from '../types';
import message from '../modules/responseMessage';

const createUpdateAccount = async (accountInfo: ISaveAccountInfo) => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        await conn.beginTransaction();
        if (accountInfo.addAccountData) {
            for (const item of accountInfo.addAccountData) {
                await createAccount(conn, item);
            }
        }
        if (accountInfo.modifyAccountData) {
            for (const item of accountInfo.modifyAccountData) {
                await updateAccount(conn, item);
            }
        }
        await conn.commit();
    } catch (error) {
        if (conn) {
            await conn.rollback();
        }
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const createAccount = async (
    conn: PoolConnection,
    accountInfo: IAccountData,
) => {
    await conn.execute(utils.buildInsertQuery('user_accounts', accountInfo));
};

const getUserAccounts = async (userId: number) => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        const result = await conn.execute(
            `SELECT * FROM user_accounts WHERE user_id=${userId}`,
        );
        return parseUserAccounts(result[0]);
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const parseUserAccounts = (userAccounts: any) => {
    const parsedAccounts = userAccounts.map((el) => {
        el.start_date = el.start_date
            ? formatDate(new Date(el.start_date), 'YYYY-MM-DD')
            : null;
        el.created_date = el.created_date
            ? formatDate(new Date(el.created_date), 'YYYY-MM-DD HH:mm:ss')
            : null;
        el.update_date = el.update_date
            ? formatDate(new Date(el.update_date), 'YYYY-MM-DD HH:mm:ss')
            : null;
        return el;
    });

    return parsedAccounts;
};

const updateAccount = async (
    conn: PoolConnection,
    accountInfo: IAccountData,
) => {
    const conditionObj = {
        account_id: accountInfo.accountId,
        user_id: accountInfo.userId,
    };
    const accountExists = await conn.execute(
        utils.buildDataExistQuery('user_accounts', conditionObj),
    );
    if (
        !accountExists ||
        !accountExists[0] ||
        accountExists[0][0].count === 0
    ) {
        throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    await conn.execute(
        utils.buildUpdateQuery('user_accounts', accountInfo, conditionObj),
    );
};

const deleteAccount = async (accountId: Number) => {
    let conn: PoolConnection;
    try {
        const conditionObj = { account_id: accountId };
        conn = await connectionPool.getConnection();
        const accountExists = await conn.execute(
            utils.buildDataExistQuery('user_accounts', conditionObj),
        );
        if (
            !accountExists ||
            !accountExists[0] ||
            accountExists[0][0].count === 0
        ) {
            throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
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

export { createUpdateAccount, getUserAccounts, deleteAccount, getAssetTypes };

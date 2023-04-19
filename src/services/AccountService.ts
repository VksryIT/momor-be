import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import connectionPool from '../database/connect/maria';
import * as utils from '../database/utils/index';
import { throwNewHttpError } from '../middlewares/errorHandler';
import statusCode from '../modules/statusCode';
import { formatDate } from '../modules/utils';
import { IAccountData, IRespAccountData, ISaveAccountInfo, Mapper } from '../types';
import message from '../modules/responseMessage';
import { mapRows } from '../database/utils/index';

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

const mapRowToAccount: Mapper<IRespAccountData> = (row) => ({
    accountId: row.account_id,
    assetTypeId: row.asset_type_id,
    accountName: row.account_name,
    startAmount: row.start_amount,
    startDate: formatDate(new Date(row.start_date), 'YYYY-MM-DD'),
    useStatus: row.use_status,
  });

const getUserAccounts = async (userId: number) => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        const query = 'SELECT * FROM user_accounts WHERE user_id = ?';
        const [rows] = await conn.execute<RowDataPacket[]>(query, [userId]);
        const accounts = mapRows(rows, mapRowToAccount);
        return accounts;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
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

const deleteAccount = async (accountId: number, userId: number) => {
    let conn: PoolConnection;
    try {
        const conditionObj = { account_id: accountId, user_id: userId };
        conn = await connectionPool.getConnection();
        const accountExists = await conn.execute(
            utils.buildDataExistQuery('user_accounts', conditionObj),
        );
        if (!accountExists || !accountExists[0][0].count) {
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

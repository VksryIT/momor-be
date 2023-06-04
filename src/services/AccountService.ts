import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import * as utils from '../database/utils/index';
import { mapRows } from '../database/utils/index';
import runTransaction from '../database/utils/runTransaction';
import { throwNewHttpError } from '../middlewares/errorHandler';
import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import { formatDate } from '../modules/utils';
import {
    IAccountData,
    IRespAccountData,
    ISaveAccountInfo,
    Mapper,
} from '../types';

const createUpdateAccount = async (
    accountInfo: ISaveAccountInfo,
): Promise<void> => {
    await runTransaction(async (conn: PoolConnection) => {
        const addAccountPromises = (accountInfo.addAccountData || []).map(
            (item) => createAccount(conn, item),
        );
        const modifyAccountPromises = (accountInfo.modifyAccountData || []).map(
            (item) => updateAccount(conn, item),
        );
        await Promise.all([...addAccountPromises, ...modifyAccountPromises]);
    });
};

const createAccount = async (
    conn: PoolConnection,
    accountInfo: IAccountData,
): Promise<void> => {
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

const getUserAccounts = async (userId: number): Promise<IRespAccountData[]> => {
    return await runTransaction(async (conn: PoolConnection) => {
        const query = 'SELECT * FROM user_accounts WHERE user_id = ?';
        const [rows] = await conn.execute<RowDataPacket[]>(query, [userId]);
        const accounts = mapRows(rows, mapRowToAccount);
        return accounts;
    });
};

const checkAccountExists = async (
    conn: PoolConnection,
    accountId: number,
    userId: number,
): Promise<boolean> => {
    const conditionObj = {
        account_id: accountId,
        user_id: userId,
    };
    const accountExists = await conn.execute(
        utils.buildDataExistQuery('user_accounts', conditionObj),
    );
    return !!(
        accountExists &&
        accountExists[0] &&
        accountExists[0][0].count > 0
    );
};

const updateAccount = async (
    conn: PoolConnection,
    accountInfo: IAccountData,
): Promise<void> => {
    const accountExists = await checkAccountExists(
        conn,
        accountInfo.accountId,
        accountInfo.userId,
    );
    if (!accountExists) {
        throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    await conn.execute(
        utils.buildUpdateQuery('user_accounts', accountInfo, {
            account_id: accountInfo.accountId,
            user_id: accountInfo.userId,
        }),
    );
};

const deleteAccount = async (
    accountId: number,
    userId: number,
): Promise<void> => {
    await runTransaction(async (conn: PoolConnection) => {
        const accountExists = await checkAccountExists(conn, accountId, userId);
        if (!accountExists) {
            throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
        }
        await conn.execute(
            utils.buildDeleteQuery('user_accounts', {
                account_id: accountId,
                user_id: userId,
            }),
        );
    });
};

const getAssetTypes = async (): Promise<any> => {
    return await runTransaction(async (conn: PoolConnection) => {
        const result = await conn.execute(
            'SELECT * FROM account_asset_type ORDER BY id ASC',
        );
        return result[0];
    });
};

const getBanks = async (): Promise<any> => {
    return await runTransaction(async (conn: PoolConnection) => {
        const result = await conn.execute('SELECT * FROM account_banks');
        return result[0];
    });
};

export {
    createUpdateAccount,
    getUserAccounts,
    deleteAccount,
    getAssetTypes,
    getBanks,
};

import { PoolConnection } from 'mysql2/promise';
import { ISaveCardCompnayInfo } from '../types/cards';
import { throwNewHttpError } from '../middlewares/errorHandler';
import * as utils from '../database/utils/index';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import runTransaction from '../database/utils/runTransaction';

const createCardCompany = async (data: ISaveCardCompnayInfo) => {
    await runTransaction(async (conn: PoolConnection) => {
        for (const item of data?.companyData) {
            if (item.code && item.corpName) {
                await conn.execute(
                    utils.buildInsertQuery('card_companies', item),
                );
            } else {
                throwNewHttpError(statusCode.BAD_REQUEST, message.BAD_REQUEST);
            }
        }
    });
};

const getCardCompanies = async () => {
    return await runTransaction(async (conn: PoolConnection) => {
        const result = await conn.execute('SELECT * FROM card_companies');
        return result[0];
    });
};

const getUserCards = async (userId: number) => {
    console.log(userId);
    return await runTransaction(async (conn: PoolConnection) => {
        const result = await conn.execute(
            `SELECT * FROM user_cards WHERE user_id=${userId}`,
        );
        return result[0];
    });
};

export { createCardCompany, getCardCompanies, getUserCards };

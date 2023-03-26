import { PoolConnection } from 'mysql2/promise';
import connectionPool from '../database/connect/maria';
import { ISaveCardCompnayInfo } from '../types/cards';
import { DbErrorHandler, throwNewHttpError } from '../middlewares/errorHandler';
import * as utils from '../database/utils/index';
import statusCode from '../modules/statusCode';

const createCardCompany = async (data: ISaveCardCompnayInfo) => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        await conn.beginTransaction();
        if (data.companyData) {
            for (const item of data.companyData) {
                if (item.code && item.corpName) {
                    await conn.execute(
                        utils.buildInsertQuery('card_companies', item),
                    );
                } else {
                    throwNewHttpError(
                        statusCode.BAD_REQUEST,
                        'Invalid data request',
                    );
                }
            }
        }
        await conn.commit();
    } catch (error) {
        if (conn) {
            await conn.rollback();
        }
        DbErrorHandler(error);
    } finally {
        if (conn) conn.release();
    }
};

const getCardCompanies = async () => {
    let conn: PoolConnection;
    try {
        conn = await connectionPool.getConnection();
        const result = await conn.execute('SELECT * FROM card_companies');
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export { createCardCompany, getCardCompanies };

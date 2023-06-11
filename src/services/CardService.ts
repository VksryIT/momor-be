import { PoolConnection, RowDataPacket } from 'mysql2/promise';
import {
    ICardInfo,
    IRespCardData,
    ISaveCardCompnayInfo,
    ISaveCardInfo,
} from '../types/cards';
import { throwNewHttpError } from '../middlewares/errorHandler';
import * as utils from '../database/utils/index';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import runTransaction from '../database/utils/runTransaction';
import { Mapper } from '../types';

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

const mapRowToCard: Mapper<IRespCardData> = (row) => ({
    cardId: row.card_id,
    cardName: row.card_name,
    cardCorpId: row.card_corp_id,
    payStartDay: row.pay_start_day,
    payEndDay: row.pay_end_day,
    payMonthCode: row.pay_month_code,
    isCheckCard: row.is_check_card,
    myAccountId: row.my_account_id,
    paymentDay: row.payment_day,
    useStatus: row.use_status,
});

const getUserCards = async (userId: number) => {
    return await runTransaction(async (conn: PoolConnection) => {
        const query = 'SELECT * FROM user_cards WHERE user_id= ?';
        const [rows] = await conn.execute<RowDataPacket[]>(query, [userId]);
        const cards = utils.mapRows(rows, mapRowToCard);

        return cards;
    });
};

const createUpdateCard = async (cardInfo: ISaveCardInfo): Promise<void> => {
    await runTransaction(async (conn: PoolConnection) => {
        const addAccountPromises = (cardInfo.addCardData || []).map((item) =>
            createCard(conn, item),
        );
        const modifyAccountPromises = (cardInfo.modifyCardData || []).map(
            (item) => updateAccount(conn, item),
        );

        await Promise.all([...addAccountPromises, ...modifyAccountPromises]);
    });
};

const checkCardExists = async (
    conn: PoolConnection,
    cardId: number,
    userId: number,
): Promise<boolean> => {
    const conditionObj = {
        card_id: cardId,
        user_id: userId,
    };
    const accountExists = await conn.execute(
        utils.buildDataExistQuery('user_cards', conditionObj),
    );
    return !!(
        accountExists &&
        accountExists[0] &&
        accountExists[0][0].count > 0
    );
};

const createCard = async (
    conn: PoolConnection,
    cardInfo: ICardInfo,
): Promise<void> => {
    const sql = utils.buildInsertQuery('user_cards', cardInfo);
    await conn.execute(sql);
};

const updateAccount = async (
    conn: PoolConnection,
    cardInfo: ICardInfo,
): Promise<void> => {
    const accountExists = await checkCardExists(
        conn,
        cardInfo.cardId,
        cardInfo.userId,
    );
    if (!accountExists) {
        throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
    await conn.execute(
        utils.buildUpdateQuery('user_cards', cardInfo, {
            card_id: cardInfo.cardId,
            user_id: cardInfo.userId,
        }),
    );
};

const deleteCard = async (cardId: number, userId: number): Promise<void> => {
    await runTransaction(async (conn: PoolConnection) => {
        const cardExists = await checkCardExists(conn, cardId, userId);
        if (!cardExists) {
            throwNewHttpError(statusCode.NOT_FOUND, message.NOT_FOUND);
        }
        await conn.execute(
            utils.buildDeleteQuery('user_cards', {
                card_id: cardId,
                user_id: userId,
            }),
        );
    });
};

export {
    createCardCompany,
    getCardCompanies,
    createUpdateCard,
    getUserCards,
    deleteCard,
};

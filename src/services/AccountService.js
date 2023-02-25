import connectionPool from '../database/connect/maria.js';
import utils from '../database/utils/index.js';

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

export default {
    createAccount,
};

const connectionPool = require('../database/connect/maria');
const utils = require('../database/utils/index.js');

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
    getAssetTypes,
};

import { PoolConnection } from "mysql2/promise";
import connectionPool from '../connect/maria';
import { DbErrorHandler } from '../../middlewares/errorHandler';

const runTransaction = async (callback: (conn: PoolConnection) => any) => {
    let conn: PoolConnection | undefined;
    try {
        conn = await connectionPool.getConnection();
        await conn.beginTransaction();
        const result = await callback(conn);
        await conn.commit();
        return result;
    } catch (error) {
        console.error(error);
        if (conn) {
            await conn.rollback();
        }
        DbErrorHandler(error);
    } finally {
        conn?.release();
    }
};

export default runTransaction;
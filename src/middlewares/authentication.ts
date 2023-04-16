import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import connectionPool from '../database/connect/maria';

import { throwNewHttpError } from './errorHandler';
import { PoolConnection } from 'mysql2/promise';
import { NextFunction } from 'express';

const isAuthenticated = (req: any, res: any, next: NextFunction) => {
    if (req.session.passport?.user?.userId === undefined) {
        throwNewHttpError(statusCode.UNAUTHORIZED, message.NOT_AUTHENTICATED);
    } else next();
};

const isSameUserRequest = (req: any, res: any, next: NextFunction) => {
    if (req.session.passport?.user?.userId !== parseInt(req.params?.userId)) {
        throwNewHttpError(
            statusCode.UNAUTHORIZED,
            message.USER_SESSION_NOT_MATCH,
        );
    } else next();
};

const checkUserName = async (req: any, res: any, next: NextFunction) => {
    let conn: PoolConnection;
    try {
        const userName = req.body.username;
        conn = await connectionPool.getConnection();
        const isUniqueUserName = await conn.execute(
            `SELECT COUNT(*) AS count FROM user WHERE name = '${userName}';`,
        );
        const { count } = isUniqueUserName[0][0];
        if (count > 0) {
            throwNewHttpError(statusCode.CONFLICT, message.DUPLICATE_RESOURCE);
        } else {
            next();
        }
    } catch (error) {
        console.error(error)
        next(error);
    } finally {
        if (conn) conn.release();
    }
};

export { isAuthenticated, isSameUserRequest, checkUserName };

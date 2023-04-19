import crypto from 'crypto';
import { PoolConnection, ResultSetHeader } from 'mysql2/promise';
import util from 'util';
import connectionPool from '../database/connect/maria';
import runTransaction from '../database/utils/runTransaction';
import { IUserCreateInfo } from '../types';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const getHashedPasswordAndSalt = async (password: string) => {
    const salt = (await randomBytesPromise(64)).toString('base64');
    const hashedPassword = (
        await pbkdf2Promise(password, salt, 102542, 64, 'sha512')
    ).toString('base64');
    return { hashedPassword: hashedPassword, salt: salt };
};

const checkIfUserNameExists = async (userName: string): Promise<boolean> => {
    return await runTransaction(async (conn: PoolConnection) => {
        conn = await connectionPool.getConnection();
        const isUniqueUserName = await conn.execute(
            `SELECT COUNT(*) AS count FROM user WHERE name = ?;`,
            [userName],
        );
        const { count } = isUniqueUserName[0][0];
        if (count === 1) return true;
        if (count === 0) return false;
    });
};

const createUser = async (userInfo: IUserCreateInfo): Promise<void> => {
    await runTransaction(async (conn: PoolConnection) => {
        const { hashedPassword, salt } = await getHashedPasswordAndSalt(
            userInfo.password,
        );
        const userInsertResult = await conn.execute<ResultSetHeader>(
            `INSERT INTO user (name) VALUES (?)`,
            [userInfo.username],
        );
        const userId = userInsertResult[0].insertId;
        await conn.execute(
            `INSERT INTO user_password (user_id, password, salt) 
        VALUES (?, ?, ?)`,
            [userId, hashedPassword, salt],
        );
    });
};

export { createUser, checkIfUserNameExists };


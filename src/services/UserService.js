import crypto from 'crypto';
import util from 'util';
import connectionPool from '../database/connect/maria.js';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const getHashedPasswordAndSalt = async (password) => {
    const salt = (await randomBytesPromise(64)).toString('base64');
    const hashedPassword = (
        await pbkdf2Promise(password, salt, 102542, 64, 'sha512')
    ).toString('base64');
    return { hashedPassword: hashedPassword, salt: salt };
};

const checkIfUserNameExists = async (userName) => {
    let conn;
    try {
        conn = await connectionPool.getConnection();
        const isUniqueUserName = await conn.execute(
            `SELECT COUNT(*) AS count FROM user WHERE name = '${userName}';`,
        );
        const { count } = isUniqueUserName[0][0];
        if (count === 1) return true;
        if (count === 0) return false;
        throw new Error('DB check user name exists error... neither 0 or 1');
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

const createUser = async (userInfo) => {
    let conn;
    try {
        const { hashedPassword, salt } = await getHashedPasswordAndSalt(
            userInfo.password,
        );
        conn = await connectionPool.getConnection();
        await conn.beginTransaction();
        const userInsertResult = await conn.execute(
            `INSERT INTO user (name) VALUES ('${userInfo.name}')`,
        );
        await conn.execute(`INSERT INTO user_password (user_no, password, salt) 
                            VALUES (${userInsertResult[0].insertId}, '${hashedPassword}', '${salt}')`);
        await conn.commit();
    } catch (error) {
        if (conn) await conn.rollback();
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

export default {
    createUser,
    checkIfUserNameExists,
};

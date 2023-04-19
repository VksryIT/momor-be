import crypto from 'crypto';
import { PoolConnection } from 'mysql2/promise';
import util from 'util';
import runTransaction from '../database/utils/runTransaction';

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

/**
 * 정상 로그인 시 userId 값 반환, isPassWordMatch: true 반환
 * @param {*} username
 * @param {*} pw
 * @returns
 */
const checkLogin = async (username: string, pw: string) => {
    return await runTransaction(async (conn: PoolConnection) => {
        const userAuthInfo: any = await conn.execute(
            `SELECT user.id, user.name, up.password, up.salt
            FROM user
            JOIN user_password AS up
            ON user.id = up.user_id
            WHERE user.name = ?; 
            `,
            [username],
        );
        // 사용자 미존재
        if (userAuthInfo[0].length === 0)
            return { userId: undefined, isPassWordMatch: undefined };
        const { id, password, salt } = userAuthInfo[0][0];
        const requestHashedPassword = (
            await pbkdf2Promise(pw, salt, 102542, 64, 'sha512')
        ).toString('base64');
        if (requestHashedPassword === password) {
            return { userId: id, isPassWordMatch: true };
        } else {
            // 사용자 비밀번호 불일치
            return { userId: id, isPassWordMatch: false };
        }
    });
};

export { checkLogin };


const crypto = require('crypto');
const util = require('util');
const connectionPool = require('../database/connect/maria.js');

const pbkdf2Promise = util.promisify(crypto.pbkdf2);

/**
 * 정상 로그인 시 userId 값 반환, isPassWordMatch: true 반환
 * @param {*} username
 * @param {*} pw
 * @returns
 */
const checkLogin = async (username, pw) => {
    let conn;
    try {
        conn = await connectionPool.getConnection();
        const userAuthInfo = await conn.execute(
            `SELECT user.user_no, user.name, up.password, up.salt
            FROM user
            JOIN user_password AS up
            ON user.user_no = up.user_no
            WHERE user.name = '${username}'; 
            `,
        );
        // 사용자 미존재
        if (userAuthInfo[0].length === 0)
            return { userId: undefined, isPassWordMatch: undefined };
        const { user_no, password, salt } = userAuthInfo[0][0];
        const requestHashedPassword = (
            await pbkdf2Promise(pw, salt, 102542, 64, 'sha512')
        ).toString('base64');
        if (requestHashedPassword === password) {
            return { userId: user_no, isPassWordMatch: true };
        } else {
            // 사용자 비밀번호 불일치
            return { userId: user_no, isPassWordMatch: false };
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

module.exports = {
    checkLogin,
};

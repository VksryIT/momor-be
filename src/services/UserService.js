import connPool from '../database/connect/maria.js';


const createUser = async (userInfo) => {
    let conn, result;
    try {
        conn = connPool;
        result = conn.query(`INSERT INTO user (name) VALUES ('${userInfo.name}')`);
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}


export default {
    createUser,
}
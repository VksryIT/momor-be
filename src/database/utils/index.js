// string 데이터의 경우 "" 붙여줌
const convertDataToSqlInputString = (dataArray) => {
    let result = '';

    dataArray.forEach((ele, idx) => {
        if (typeof ele === 'string') {
            result += '"' + ele + '",';
        } else {
            if (idx === dataArray.length - 1) {
                result += ele;
            } else {
                result += ele + ',';
            }
        }
    });
    return result;
};

const buildInsertQuery = (tableName, dataObj) => {
    let insert_query = `INSERT INTO ${tableName}(`;
    insert_query += Object.keys(dataObj).toString() + ') VALUES(';
    insert_query += convertDataToSqlInputString(Object.values(dataObj));
    insert_query += ')';

    return insert_query;
};

export default {
    convertDataToSqlInputString,
    buildInsertQuery,
};

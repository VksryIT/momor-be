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

const convertStringValue = (value) => {
    if (typeof value === 'string') {
        return '"' + value + '"';
    }
    return value;
};

const buildInsertQuery = (tableName, dataObj) => {
    let insert_query = `INSERT INTO ${tableName}(`;
    insert_query += Object.keys(dataObj).toString() + ') VALUES(';
    insert_query += convertDataToSqlInputString(Object.values(dataObj));
    insert_query += ')';

    return insert_query;
};

const buildUpdateQuery = (tableName, updateDataObj, conditionObj) => {
    const updateFields = Object.keys(updateDataObj);
    const conditionFields = Object.keys(conditionObj);
    let update_query = `UPDATE ${tableName} `;

    updateFields.forEach((field, idx) => {
        if (idx === 0) {
            update_query += `SET ${field} = ${convertStringValue(
                updateDataObj[field],
            )}`;
        } else {
            update_query += `,${field} = ${convertStringValue(
                updateDataObj[field],
            )} `;
        }
    });
    conditionFields.forEach((field, idx) => {
        if (idx === 0) {
            update_query += `WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )} `;
        } else {
            update_query += `AND WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )}`;
        }
    });
    return update_query;
};

const buildDeleteQuery = (tableName, conditionObj) => {
    let delete_query = `DELETE FROM ${tableName} `;
    const conditionFields = Object.keys(conditionObj);
    conditionFields.forEach((field, idx) => {
        if (idx == 0) {
            delete_query += `WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )} `;
        } else {
            delete_query += `AND WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )}`;
        }
    });
    return delete_query;
};

const buildDataExistQuery = (tableName, conditionObj) => {
    let exist_query = `SELECT COUNT(*) AS count FROM ${tableName} `;
    const conditionFields = Object.keys(conditionObj);
    conditionFields.forEach((field, idx) => {
        if (idx == 0) {
            exist_query += `WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )} `;
        } else {
            exist_query += `AND WHERE ${field} = ${convertStringValue(
                conditionObj[field],
            )}`;
        }
    });
    return exist_query;
};

module.exports = {
    convertDataToSqlInputString,
    buildInsertQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildDataExistQuery,
};

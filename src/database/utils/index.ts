// string 데이터의 경우 "" 붙여줌
const convertDataToSqlInputString = (dataArray: Array<any>) => {
    let result = '';

    dataArray.forEach((ele: any, idx: number) => {
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

const convertStringValue = (value: any) => {
    if (typeof value === 'string') {
        return '"' + value + '"';
    }
    return value;
};

const buildInsertQuery = (tableName: string, dataObj: Object) => {
    let insert_query = `INSERT INTO ${tableName}(`;
    insert_query += Object.keys(dataObj).toString() + ') VALUES(';
    insert_query += convertDataToSqlInputString(Object.values(dataObj));
    insert_query += ')';

    return insert_query;
};

const buildUpdateQuery = (
    tableName: string,
    updateDataObj: Object,
    conditionObj: Object,
) => {
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

const buildDeleteQuery = (tableName: string, conditionObj: Object) => {
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

const buildDataExistQuery = (tableName: string, conditionObj: Object) => {
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

export {
    convertDataToSqlInputString,
    buildInsertQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildDataExistQuery,
};

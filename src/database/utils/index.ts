import snakecaseKeys from 'snakecase-keys';

const convertStringValue = (value: any) =>
    typeof value === 'string' ? `"${value}"` : value;

const buildInsertQuery = (tableName: string, dataObj: Object) => {
    dataObj = snakecaseKeys(dataObj);
    const columns = Object.keys(dataObj).join(',');
    const values = Object.values(dataObj).map(convertStringValue).join(',');
    return `INSERT INTO ${tableName}(${columns}) VALUES(${values})`;
};

const buildUpdateQuery = (
    tableName: string,
    updateDataObj: Object,
    conditionObj: Object,
) => {
    updateDataObj = snakecaseKeys(updateDataObj);
    const updateFields = Object.entries(updateDataObj)
        .map(([key, value]) => `${key}=${convertStringValue(value)}`)
        .join(',');
    const conditions = Object.entries(conditionObj)
        .map(([key, value]) => `${key}=${convertStringValue(value)}`)
        .join(' AND ');
    return `UPDATE ${tableName} SET ${updateFields} WHERE ${conditions}`;
};

const buildDeleteQuery = (tableName: string, conditionObj: Object) => {
    const conditions = Object.entries(conditionObj)
        .map(([key, value]) => `${key}=${convertStringValue(value)}`)
        .join(' AND ');
    return `DELETE FROM ${tableName} WHERE ${conditions}`;
};

const buildDataExistQuery = (tableName: string, conditionObj: Object) => {
    const conditions = Object.entries(conditionObj)
        .map(([key, value]) => `${key}=${convertStringValue(value)}`)
        .join(' AND ');
    return `SELECT COUNT(*) AS count FROM ${tableName} WHERE ${conditions}`;
};

export {
    buildInsertQuery,
    buildUpdateQuery,
    buildDeleteQuery,
    buildDataExistQuery,
};

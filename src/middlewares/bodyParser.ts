import express from 'express';
import snakecaseKeys from 'snakecase-keys';

const snakecaseKeysMiddleware = (req: any, res: any, next: any) => {
    if (req.body) {
        req.body = snakecaseKeys(req.body);
    }
    next();
};

const camelcaseKeys = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(camelcaseKeys);
    }

    return Object.keys(obj).reduce((result, key) => {
        const value = obj[key];
        const camelcaseKey = key.replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace('-', '').replace('_', ''),
        );
        result[camelcaseKey] = camelcaseKeys(value);
        return result;
    }, {});
};

const camelcaseKeysMiddleware = (req: any, res: any, next: any) => {
    const originalJson = res.send;
    res.send = function (body) {
        const camelcaseBody = camelcaseKeys(body);
        return originalJson.call(this, camelcaseBody);
    };
    next();
};

export { snakecaseKeysMiddleware, camelcaseKeysMiddleware };

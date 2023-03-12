import express from 'express';
import snakecaseKeys from 'snakecase-keys';

const snakecaseKeysMiddleware = (req: any, res: any, next: any) => {
    if (req.body) {
        req.body = snakecaseKeys(req.body);
    }
    next();
};

export { snakecaseKeysMiddleware };

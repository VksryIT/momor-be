import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../types';

const throwNewHttpError = (
    errorCode: number,
    errorMsg: string,
) => {
    const httpError: HTTPError = {
        status: errorCode,
        message: errorMsg,
    };
    throw httpError;
};

const errorHandler = (
    error: HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';

    res.status(status).send({
        status,
        message,
    });
};

export { throwNewHttpError, errorHandler };

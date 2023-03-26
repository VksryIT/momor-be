import { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import { HTTPError } from '../types';

interface DbError {
    code: string;
    errno: number;
}

const throwNewHttpError = (errorCode: number, errorMsg: string) => {
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

const DbErrorHandler = (error: DbError) => {
    switch (error.code) {
        case 'ER_DUP_ENTRY':
            throwNewHttpError(statusCode.CONFLICT, 'Duplicate resource.');
            break;

        default:
            throw error;
    }
};

export { throwNewHttpError, errorHandler, DbErrorHandler };

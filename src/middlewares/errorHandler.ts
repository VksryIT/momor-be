import { Request, Response, NextFunction } from 'express';
import statusCode from '../modules/statusCode';
import { HTTPError } from '../types';

interface DbError {
    code: string;
    errno: number;
}

const throwNewHttpError = (status: number, errorCode: string) => {
    const httpError: HTTPError = {
        status: status,
        code: errorCode,
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
    const errorCode = error.code || 'INTERNAL ERROR';

    res.status(status).send({
        errorCode,
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

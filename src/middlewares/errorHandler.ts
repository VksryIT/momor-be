import { Request, Response, NextFunction } from 'express';

const throwNewError = (errorCode: any, errorName: any, errorMsg: any) => {
    const newError = new Error(errorMsg ?? 'error occured');
    newError.name = errorName;
    throw newError;
};

interface HttpError extends Error {
    status?: number;
}

const errorHandler = (
    error: HttpError,
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

export { throwNewError, errorHandler };

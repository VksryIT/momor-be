import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import { throwNewHttpError } from './errorHandler';

const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.passport?.user?.userId === undefined) {
        throwNewHttpError(statusCode.UNAUTHORIZED, message.NOT_AUTHENTICATED);
    } else next();
};

const isSameUserRequest = (req: any, res: any, next: any) => {
    if (req.session.passport?.user?.userId !== parseInt(req.params?.userId)) {
        throwNewHttpError(
            statusCode.UNAUTHORIZED,
            message.USER_SESSION_NOT_MATCH,
        );
    } else next();
};

export { isAuthenticated, isSameUserRequest };

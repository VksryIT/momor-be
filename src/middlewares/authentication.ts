import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/utils';

const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.passport?.user?.userId === undefined) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.sendResponse(statusCode.UNAUTHORIZED, message.NOT_AUTHENTICATED),
            );
    } else next();
};

const isSameUserRequest = (req: any, res: any, next: any) => {
    if (req.session.passport?.user?.userId !== parseInt(req.params?.userNo)) {
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(
                util.sendResponse(
                    statusCode.UNAUTHORIZED,
                    message.USER_SESSION_NOT_MATCH,
                ),
            );
    } else next();
};

export { isAuthenticated, isSameUserRequest };

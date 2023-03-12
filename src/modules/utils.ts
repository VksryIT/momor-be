const util = {
    sendResponse: (status: any, message: any, data?: any) => {
        return {
            status,
            message,
            data,
        };
    },
};

export = util;

const util = {
    sendResponse: (status: number, message: string, data?: any) => {
        return {
            status,
            message,
            data,
        };
    },
};

export = util;

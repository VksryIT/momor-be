const util = {
    success: (status: any, message: any, data?: any) => {
        return {
            status,
            success: true,
            message,
            data,
        };
    },
    fail: (status: any, message: any) => {
        return {
            status,
            success: false,
            message,
        };
    },
};

export = util;

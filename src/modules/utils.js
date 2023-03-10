const util = {
    success: (status, message, data) => {
        return {
            status,
            success: true,
            message,
            data,
        };
    },
    fail: (status, message, data) => {
        return {
            status,
            success: false,
            message,
        };
    },
};

export default util;

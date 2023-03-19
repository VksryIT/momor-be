const util = {
    sendResponse: (status: number, message: string, data?: any) => {
        return {
            status,
            message,
            data,
        };
    },
    formatDate: (date: Date, format: string): string => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // month는 0부터 시작하기 때문에 1을 더하고 문자열로 변환
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');
        let result = format
            .replace('YYYY', yyyy.toString())
            .replace('MM', mm)
            .replace('DD', dd)
            .replace('HH', hh)
            .replace('mm', mi)
            .replace('ss', ss);
        return result;
    },
};

export = util;

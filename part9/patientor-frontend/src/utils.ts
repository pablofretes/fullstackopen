/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseDate = (date: any): string | null => {
    if(!date || !isDate(date) || !isString(date)){
        return null;
    }
    return date;
};
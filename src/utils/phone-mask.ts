export const phoneClear = (phone: string) => {
    return phone ? phone.replace(/[^+\d]+/g, '') : '';
};

export const phoneMask = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
        const intlCode = match[1] ? '+7 ' : '';
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('');
    }
};

export const replaceRussianPhonePrefix = (inputValue: any, type: string) => {
    let value = inputValue;

    if (type === 'tel') {
        if (
            value === '8' ||
            value === '+7 (8' ||
            value === '7' ||
            value === '+7 (7' ||
            value === '+' ||
            value === '+7 (+'
        ) {
            value = '+7 (';
        }
    }

    return value;
};

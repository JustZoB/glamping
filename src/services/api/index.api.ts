import type { IFormatError } from '@/types/api';

export const formatError = (message: string, error?: any): IFormatError => {
    if (error && error.response) {
        if (error.response.data && error.response.data.errors) {
            return {
                success: false,
                message: error.response.data.message,
            };
        }
        if (error.response.status === 404) {
            return {
                success: false,
                message: message,
            };
        }
    }

    return {
        success: false,
        message,
    };
};

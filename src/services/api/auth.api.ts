import axios from 'axios';
import createI18n from '@/i18n/index';
import type { IUser } from '@/types/users';

const { t } = createI18n.global;

export interface IApiResponse {
    success: boolean;
    message?: string;
    data: any | null;
}

export interface UserPayload {
    token: string;
    user: IUser;
}

const errorResponse = (message: string) => {
    return {
        success: false,
        message,
        data: null,
    };
};

const makePayloadFromResponse = (data: any) => {
    return {
        token: data.token,
        user: {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
        } as unknown as UserPayload,
    };
};

export default {
    login: async (login: string, password: string): Promise<IApiResponse> => {
        try {
            const { data } = await axios.post('/login', {
                email: login,
                password: password,
            });

            if (data.success) {
                return {
                    success: true,
                    data: makePayloadFromResponse(data.data),
                };
            } else {
                if (data.error === 'wrong_credentials') {
                    return errorResponse(t('error.wrong.login-or-password'));
                }

                return errorResponse(data.message ? data.message : t('toast.failed.login'));
            }
        } catch (e: any) {
            let message = e.message;

            if (e.response) {
                if (e.response.status === 401) {
                    message = t('error.wrong.login-or-password');
                }
            }

            return errorResponse(message);
        }
    },

    logout: async (): Promise<IApiResponse> => {
        try {
            const { data } = await axios.post('/logout');

            if (data.success) {
                return { success: true, data: null };
            } else {
                return errorResponse(data.message ? data.message : t('toast.failed.logout'));
            }
        } catch (e: any) {
            return errorResponse(e.message ? e.message : t('toast.failed.logout'));
        }
    },

    getProfile: async (): Promise<IApiResponse> => {
        try {
            const { data } = await axios.get('/profile');

            if (data.success) {
                return {
                    success: true,
                    data: makePayloadFromResponse(data.data),
                };
            } else {
                return errorResponse(data.message ? data.message : t('toast.failed.get', { it: t('name.profile') }));
            }
        } catch (e: any) {
            let message = e.message;

            if (e.response) {
                if (e.response.status === 401) {
                    message = t('error.wrong.login-or-password');
                }
            }

            return errorResponse(message);
        }
    },
};

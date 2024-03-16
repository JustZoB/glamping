import axios, { AxiosError } from 'axios';
import createI18n from '@/i18n/index';
import { formatError } from '@/services/api/index.api';
import type { ICreateUser, IEditUser, IRole, IUser } from '@/types/users';
import type { IRequestParams, IMeta } from '@/types/api';

const { t } = createI18n.global;

export async function getUsers(
    params: IRequestParams | null = null
): Promise<{ data?: IUser[]; meta?: IMeta | null; success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.get', { it: t('name.users') });

    try {
        const response = await axios.get('/users', { params });

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function getCreateUser(): Promise<{ roles?: IRole[]; success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.get', { it: t('name.user') });

    try {
        const response = await axios.get(`/users/create`);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function getEditUser(
    id: number
): Promise<{ data?: IEditUser; roles?: IRole[]; success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.get', { it: t('name.user') });

    try {
        const response = await axios.get(`/users/${id}/edit`);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function createUser(user: ICreateUser): Promise<{ roles?: IRole[]; success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.create', { it: t('name.user') });

    try {
        const response = await axios.post(`/users`, user);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e: any) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function updateUser(id: number, user: IEditUser): Promise<{ success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.update', { it: t('name.user') });

    try {
        const response = await axios.patch(`/users/${id}`, user);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e: any) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function fastBlockUser(id: number, active: boolean): Promise<{ success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.update', { it: t('name.user') });

    try {
        const response = await axios.patch(`/users/${id}/active`, { active });

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e: any) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function deleteUser(id: number): Promise<{ success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.delete', { it: t('name.user') });

    try {
        const response = await axios.delete(`/users/${id}`);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e: any) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

export async function deleteUsers(ids: number[]): Promise<{ success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.delete', { it: t('name.users') });

    try {
        const response = await axios.delete(`/users/${ids.join(',')}`);

        if (response) {
            return response.data;
        } else {
            return formatError(failedMessage);
        }
    } catch (e: any) {
        const err = e as AxiosError;

        return formatError(failedMessage, err);
    }
}

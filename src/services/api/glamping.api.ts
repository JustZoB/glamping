import axios, { AxiosError } from 'axios';
import createI18n from '@/i18n/index';
import { formatError } from '@/services/api/index.api';
import { IGlamping } from '@/types/glamping';

const { t } = createI18n.global;

export async function getEditGlamping(id: number): Promise<{ data?: IGlamping; success?: boolean; message?: string }> {
    const failedMessage = t('toast.failed.get', { it: t('name.glamping') });

    try {
        const response = await axios.get(`/glamping/${id}/edit`);

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

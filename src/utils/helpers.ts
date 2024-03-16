import { useToast } from 'vue-toastification';
import type { SortType } from '@/types/table';
import type { LocationQuery } from 'vue-router';
import type { IRequestParams } from '@/types/api';

const toast = useToast();

export const isRequestSuccess = (response: any, successMessage: string, failedMessage: string): boolean => {
    if (response && response.success) {
        toast.success(response.message ? response.message : successMessage);

        return true;
    } else {
        if (response.messages && Object.keys(response.messages).length) {
            Object.keys(response.messages).forEach((key: string) => {
                response.messages[key].forEach((message: string) => {
                    toast.error(message);
                });
            });
        } else {
            toast.error(response.message ? response.message : failedMessage);
        }

        return false;
    }
};

export function slideToggle(e: MouseEvent, nextEl?: HTMLElement) {
    e.preventDefault();

    const target = e.target;
    if (target === null) {
        return false;
    }

    if (target instanceof Element) {
        const container = target.nextElementSibling || nextEl;
        if (!container) {
            return false;
        }

        if (container instanceof HTMLElement) {
            target.classList.toggle('opened');

            if (!container.classList.contains('active')) {
                container.classList.add('active');
                container.style.height = 'auto';

                const height = container.clientHeight + 'px';

                container.style.height = '0px';
                container.style.opacity = '0%';

                setTimeout(function () {
                    container.style.height = height;
                    container.style.opacity = '100%';

                    container.addEventListener(
                        'transitionend',
                        function () {
                            container.style.height = 'auto';
                        },
                        {
                            once: true,
                        }
                    );
                }, 0);
            } else {
                const height = container.clientHeight + 'px';
                container.style.height = height;
                container.style.opacity = '0%';

                setTimeout(function () {
                    container.style.height = '0px';
                }, 0);

                container.addEventListener(
                    'transitionend',
                    function () {
                        container.classList.remove('active');
                        container.style.height = 'auto';
                    },
                    {
                        once: true,
                    }
                );
            }
        }
    }
}

export const setRequestParamsFromQuery = (query: LocationQuery): IRequestParams => {
    const requestParams: IRequestParams = {};
    const defaultLimit = 50;

    if (query.limit) {
        requestParams.limit = +(query.limit as string);
    } else requestParams.limit = defaultLimit;
    if (query.sort) requestParams.sort = query.sort as string;
    if (query.order) requestParams.order = query.order as SortType;
    if (query.page) requestParams.page = +(query.page as string);
    if (query.query) requestParams.query = query.query as string;

    return requestParams;
};

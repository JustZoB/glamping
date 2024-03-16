import type { Ref } from 'vue';

export type SortType = 'desc' | 'asc';

export type EmitsEventName = 'search' | 'addRow' | 'editRow' | 'deleteRows' | 'updateSort' | 'toPage';

export interface ITableHeaders {
    label?: string;
    field?: string;
    sortable?: boolean;
    sortableLocal?: boolean;
    totalTitle?: string;
    totalPrice?: Ref<number | undefined>;
    class?: string;
}

export interface ISort {
    sort?: string;
    order?: SortType | null;
}

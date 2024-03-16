import type { SortType } from '@/types/table';

export interface IFormatError {
    success: boolean;
    message: string;
}

export interface IRequestParams {
    page?: number;
    query?: string;
    sort?: string;
    order?: SortType | null;
    limit?: number;
}

export interface IMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ISeoField {
    code: string;
    value: string;
}

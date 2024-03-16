import { ICustomer } from '@/types/customers';
import { ILog } from '@/types/logs';

export interface IGlamping {
    id: number;
    name: string;
    date_from?: Date | string | null;
    date_to?: Date | string | null;
    customer: ICustomer;
    local_temperature?: string | number;
    target_temperature?: string | number;
    heating: boolean;
    forced_ventilation: boolean;
    electricity: boolean;
    security: boolean;
    opened: boolean;
    paid: boolean;
    logs?: ILog[];
}

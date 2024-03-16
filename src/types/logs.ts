export type LogType = 'warning' | 'error' | 'info';

export interface ILog {
    line: number;
    dateTime: string;
    stacktrace: boolean;
    type: LogType;
    message: string;
}

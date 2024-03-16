export type LogType = 'warning' | 'error' | 'info';

export interface ILaravelLogsGroup {
    group_name: string;
    files: string[];
}

export interface ILaravelFile {
    file: string;
    logs: ILaravelLog[];
}

export interface ILaravelLog {
    line: number;
    datetime: string;
    stacktrace: boolean;
    type: LogType;
    message: string;
}

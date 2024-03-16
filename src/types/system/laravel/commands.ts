export interface ILaravelCommandsGroup {
    name: string;
    commands: ILaravelCommand[];
}

export interface ILaravelCommand {
    pid?: number;
    is_running?: boolean;
    command: string;
    description: string;
}

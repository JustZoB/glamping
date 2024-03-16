export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: IRole;
    active: boolean;
}

export interface IEditUser {
    id: number | null;
    name: string;
    email: string;
    password?: string | null;
    role: IRole | null;
    active: boolean;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    role: IRole | null;
    active: boolean;
}

export interface IRole {
    id: number;
    title: string;
    name: string;
}

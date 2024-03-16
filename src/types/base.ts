export type FileType = 'image' | 'video' | 'youtube_url';

export interface ICustomField {
    code: string;
    value: string;
}

export interface IUploadImage {
    id?: number;
    file?: File;
    url?: string;
}

export interface IUploadFile {
    id?: number;
    type?: FileType;
    value?: File | string;
    available?: boolean;
    url?: string;
}

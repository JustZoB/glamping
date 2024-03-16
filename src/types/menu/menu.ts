import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface SubMenu {
    link: string;
    name: string;
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
    allowed?: boolean;
}

export interface RootLinksList {
    icon?: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
    name: string;
    submenu?: SubMenu[];
    link?: string;
    allowed?: boolean;
}

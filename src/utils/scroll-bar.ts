export function hideScrollBar() {
    document.body.style['overflow'] = 'hidden';

    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        document.body.style.paddingRight = `${getScrollBarWidth()}px`;
        const header = document.querySelector<HTMLElement>('.header');
        if (header) {
            header.style.paddingRight = `${getScrollBarWidth()}px`;
        }
    }
}

export function showScrollBar() {
    document.body.style['overflow'] = 'auto';

    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        document.body.style.paddingRight = '0';
        const header = document.querySelector<HTMLElement>('.header');
        if (header) {
            header.style.paddingRight = '0';
        }
    }
}

export function getScrollBarWidth() {
    const el = document.createElement('div');
    el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
    document.body.appendChild(el);
    const width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
}

export const isHorizontalScrollBarVisible = (): boolean => {
    return document.body.scrollWidth > document.body.clientWidth;
};

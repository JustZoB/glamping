import { isHorizontalScrollBarVisible } from '@/utils/scroll-bar';
import type { SortType } from '@/types/table';

export const updateClassesToStickyColumns = () => {
    const columnElements = document.querySelectorAll('.sticky-column');

    if (columnElements?.length) {
        if (isHorizontalScrollBarVisible()) {
            columnElements.forEach((element) => {
                element.classList.add('sticky-column-active');
            });
        } else {
            columnElements.forEach((element) => {
                element.classList.remove('sticky-column-active');
            });
        }
    }
};

export const getSortedTable = (array: any[], sort: string, order: SortType | null | undefined): any[] => {
    const sorted = array.sort((item1, item2) => {
        if (order === 'asc') {
            return item1[sort] > item2[sort] ? 1 : -1;
        } else {
            return item1[sort] < item2[sort] ? 1 : -1;
        }
    });

    return sorted;
};

export const isSortedDesc = (array: number[]): boolean => {
    if (array.length > 1) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] > array[i - 1]) {
                return false;
            }
        }
    }

    return true;
};

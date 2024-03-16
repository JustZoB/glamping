import { defineStore } from 'pinia';
import { hideScrollBar, showScrollBar } from '@/utils/scroll-bar';

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        isMobile: false,
        isSideBarShown: false,
        isScrollBarShown: true,
    }),
    actions: {
        setIsMobile(isMobile: boolean) {
            this.isMobile = isMobile;
        },
        toggleIsSideBarShown() {
            this.isSideBarShown = !this.isSideBarShown;
            if (this.isMobile) {
                this.toggleIsScrollBarShown(!this.isSideBarShown);
            }
        },
        toggleIsScrollBarShown(show?: boolean) {
            if (show || !this.isScrollBarShown) {
                showScrollBar();
            } else {
                hideScrollBar();
            }
        },
    },
});

<template>
    <li v-if="item.allowed !== false">
        <div
            v-if="item.submenu && allowedSubmenuItems.length > 1"
            class="relative item"
            v-click-outside="closeSubNavMenu"
            @mouseenter="showSubNavMenuOnMouseEnter"
            @mouseleave="closeSubNavMenuOnMouseLeave"
        >
            <div class="cursor-pointer" @click="toggleSubNavMenu">
                <router-link
                    v-if="item.link"
                    :to="item.link"
                    class="flex flex-col items-center w-full px-3 py-4 text-gray-50 text-sm font-normal text-center hover:bg-slate-950 pointer-events-none"
                >
                    <span v-if="item.icon" class="mb-2">
                        <component :is="item.icon" class="w-6 h-6" />
                    </span>
                    <span>{{ $t(`nav.${item.name}`) }}</span>
                </router-link>
            </div>
            <SubNavMenu
                v-if="item.submenu"
                :parent-link="item.link"
                :name="item.name"
                :items="item.submenu"
                class="submenu"
                :class="{ hidden: !isSubNavMenuShown }"
                @on-click-link="handleCloseSubmenu"
            />
        </div>
        <router-link
            v-else-if="item.link && (!item.submenu || allowedSubmenuItems.length === 1)"
            :to="allowedSubmenuItems.length === 1 ? `${item.link}/${allowedSubmenuItems[0].link}` : item.link"
            class="flex flex-col items-center w-full px-3 py-4 text-gray-50 text-sm font-normal text-center hover:bg-slate-950"
            @click="mainStore.toggleIsSideBarShown()"
        >
            <span v-if="item.icon" class="mb-2">
                <component :is="item.icon" class="w-6 h-6" />
            </span>
            <span>{{ $t(`nav.${item.name}`) }}</span>
        </router-link>
    </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores';
import SubNavMenu from '@/components/Base/NavItem/SubNavMenu.vue';
import type { RootLinksList, SubMenu } from '@/types/menu/menu';

const mainStore = useMainStore();

const props = defineProps<{
    item: RootLinksList;
}>();

let isSubNavMenuShown = ref(false);

const allowedSubmenuItems = computed<SubMenu[]>(() => {
    if (props.item.submenu) {
        return props.item.submenu.filter((child: SubMenu) => child.allowed !== false);
    }

    return [];
});

const handleCloseSubmenu = () => {
    isSubNavMenuShown.value = false;
};
const showSubNavMenuOnMouseEnter = () => {
    const { isMobile } = useMainStore();
    if (!isMobile) isSubNavMenuShown.value = true;
};
const closeSubNavMenuOnMouseLeave = () => {
    const { isMobile } = useMainStore();
    if (!isMobile) isSubNavMenuShown.value = false;
};
const toggleSubNavMenu = () => {
    const { isMobile } = useMainStore();
    if (isMobile) isSubNavMenuShown.value = !isSubNavMenuShown.value;
};
const closeSubNavMenu = () => {
    const { isMobile } = useMainStore();
    if (isMobile) isSubNavMenuShown.value = false;
};
</script>

<style lang="scss" scoped>
.router-link-active {
    @apply bg-gray-50 text-black hover:bg-gray-50;
}
</style>

<template>
    <div
        v-if="items?.length && items.filter((item) => item.allowed !== false).length"
        class="absolute flex flex-col left-full top-0 bg-white px-2 py-4 w-[250px] rounded-md shadow-dropdown"
    >
        <ul class="flex flex-col">
            <li v-for="(item, idx) in items" :key="idx">
                <router-link
                    v-if="item.allowed !== false"
                    :to="`${getLink(item.link)}`"
                    class="flex items-center w-full px-4 py-2 text-base text-gray-700 font-normal transition-colors hover:text-sky-800"
                    @click="
                        {
                            mainStore.toggleIsSideBarShown();
                            emits('on-click-link');
                        }
                    "
                >
                    <div class="w-4 h-4 flex justify-center items-center mr-3">
                        <component v-if="item.icon" :is="item.icon" class="w-6 h-6" />
                        <div v-else class="w-1 h-1 bg-gray-700 rounded-full"></div>
                    </div>
                    <span>{{ $t(`nav.${item.name}`) }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores';
import type { SubMenu } from '@/types/menu/menu';

const mainStore = useMainStore();

const props = defineProps<{
    name?: string;
    parentLink?: string;
    items: SubMenu[];
}>();

const emits = defineEmits<{
    (e: 'on-click-link'): void;
}>();

const getLink = (link: string) => {
    return props.parentLink ? `${props.parentLink}/${link}` : link;
};
</script>

<style lang="scss" scoped>
.router-link-active {
    @apply text-sky-800;
}
</style>

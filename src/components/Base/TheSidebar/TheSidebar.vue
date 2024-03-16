<template>
    <aside
        class="aside fixed z-50 top-0 bottom-0 left-0 flex flex-col bg-slate-900 w-[140px] lg:w-[100px] transition-transform"
        :class="isSideBarShown ? 'lg:translate-x-0' : 'lg:translate-x-[-100px]'"
    >
        <LogoComponent class="p-7 lg:p-5" />
        <TheNavbar />
        <!-- v-if="store.getUser" -->
    </aside>

    <div
        class="hidden fixed right-0 top-0 bottom-0 left-0 z-40 bg-black bg-opacity-20 overflow-hidden"
        :class="{ 'lg:block': isSideBarShown }"
        @click="() => mainStore.toggleIsSideBarShown()"
    ></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMainStore, useUserStore } from '@/stores';
import TheNavbar from '@/components/Base/TheNavbar/TheNavbar.vue';
import LogoComponent from '@/components/Base/Logo/LogoComponent.vue';

const mainStore = useMainStore();
const { isSideBarShown } = storeToRefs(mainStore);
// const store = useUserStore();
</script>

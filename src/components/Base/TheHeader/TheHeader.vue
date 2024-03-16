<template>
    <header
        class="header fixed top-0 right-0 w-full bg-white pl-[140px] h-[65px] lg:pl-0 lg:h-[60px] transition-transform shadow-header z-10"
    >
        <div class="flex items-center justify-between h-full px-8 lg:px-4">
            <div class="left-menu flex items-center gap-3">
                <div class="button-icon-header hidden lg:block" @click="mainStore.toggleIsSideBarShown()">
                    <Bars3Icon />
                </div>
                <LogoComponent class="hidden lg:block w-[60px]" />
            </div>
            <div class="right-menu flex items-center gap-2">
                <!-- <SearchButton /> -->
                <UserMenuButton />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline';
import { useMainStore } from '@/stores';
import LogoComponent from '@/components/Base/Logo/LogoComponent.vue';
// import SearchButton from '@/components/Search/SearchButton/SearchButton.vue';
import UserMenuButton from '@/components/UserMenu/UserMenuButton/UserMenuButton.vue';

const mainStore = useMainStore();
</script>

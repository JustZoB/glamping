<template>
    <nav class="navbar h-full my-4">
        <ul class="nav">
            <NavItem v-for="(item, idx) in linkList" :key="idx" :item="item" />
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline';
import NavItem from '@/components/Base/NavItem/NavItem.vue';
import { useUserStore } from '@/stores';
import type { RootLinksList } from '@/types/menu/menu';

const { isAllowed } = useUserStore();

const linkList: RootLinksList[] = [
    {
        icon: HomeIcon,
        name: 'home',
        link: '/',
        allowed: isAllowed(['super-admin', 'admin', 'manager', 'advertiser', 'storekeeper']),
    },
];
</script>

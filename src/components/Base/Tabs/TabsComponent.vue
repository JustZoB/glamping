<template>
    <div class="flex border-b border-gray-200">
        <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="`${parentLink}/${tab.link}`"
            class="px-3 py-2 rounded-t-md border-t border-l border-r border-transparent hover:border-gray-200"
        >
            {{ tab.name }}
        </router-link>
    </div>
</template>

<script setup lang="ts">
import type { ITab } from '@/types/tabs';

defineProps<{
    parentLink?: string;
    tabs: ITab[];
}>();
</script>

<style lang="scss" scoped>
.router-link-active {
    @apply border-gray-200;
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useMainStore } from '@/stores';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { updateClassesToStickyColumns } from '@/utils/custom-table';

const mainStore = useMainStore();

function setIsMobile() {
    const { isMobile } = useMainStore();
    if (isMobile && window.innerWidth > 1024) {
        mainStore.setIsMobile(false);
    } else if (!isMobile && window.innerWidth <= 1024) {
        mainStore.setIsMobile(true);
    }
}

onMounted(() => {
    setIsMobile();

    window.addEventListener('resize', () => {
        setIsMobile();
        updateClassesToStickyColumns();
    });
});
</script>

<template>
    <component :is="$route.meta.layout || DefaultLayout">
        <RouterView />
    </component>
</template>

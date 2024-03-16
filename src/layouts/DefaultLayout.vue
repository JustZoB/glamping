<template>
    <main class="flex flex-col items-center flex-[1] w-full" :class="`w-[calc(100vw-${getScrollBarWidth()}px)]`">
        <div class="content w-full px-8 py-8 sm:px-4 sm:py-4">
            <slot></slot>
        </div>
    </main>
</template>

<script setup lang="ts">
import { getScrollBarWidth } from '@/utils/scroll-bar';
</script>

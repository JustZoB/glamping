<template>
    <ExclamationCircleIcon v-if="type === 'error'" class="w-[18px] h-[18px] min-w-[18px] min-h-[18px] text-red-400" />
    <ExclamationCircleIcon v-if="type === 'info'" class="w-[18px] h-[18px] min-w-[18px] min-h-[18px] text-blue-500" />
    <ExclamationTriangleIcon
        v-if="type === 'warning'"
        class="w-[18px] h-[18px] min-w-[18px] min-h-[18px] text-yellow-500"
    />
</template>

<script setup lang="ts">
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import type { LogType } from '@/types/system/laravel/logs';

defineProps<{
    type: LogType;
}>();
</script>

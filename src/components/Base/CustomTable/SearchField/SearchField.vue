<template>
    <div class="relative">
        <MagnifyingGlassIcon class="absolute top-0 left-4 w-5 h-5 z-[1] translate-y-[60%] text-gray-700" />
        <input
            type="search"
            name="search"
            class="w-full min-w-[300px] pl-12 pr-3 py-3 bg-white rounded-md text-[15px]"
            :value="modelValue"
            ref="searchInput"
            :placeholder="placeholder"
            @input="onSearch"
        />
    </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

defineProps<{
    modelValue?: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (event: 'onSearch', payload: string | undefined): void;
}>();

let searchTimer: number | undefined = 0;

function onSearch(e: any) {
    clearTimeout(searchTimer);

    const timer = setTimeout(() => {
        emit('onSearch', e.target.value);
    }, 800);

    searchTimer = timer;
}
</script>

<template>
    <div class="rounded-lg">
        <button
            type="button"
            class="transition-3 flex items-center gap-2 w-full py-4 px-6 cursor-pointer border rounded-lg outline-transparent"
            :class="{
                'rounded-b-none': isActive,
                'bg-gray-50 border-gray-200 focus:border-gray-300': !hasErrors,
                'bg-red-500 bg-opacity-10 border-red-500 outline-red-1 focus:border-red-500 focus:border-opacity-50':
                    hasErrors,
            }"
            @click="toggleActive"
        >
            <ChevronRightIcon class="transition-3 w-5 h-5" :class="{ 'rotate-90': isActive }" />
            <span>{{ title }}</span>
        </button>

        <div class="collapse-container p-5 border rounded-b-lg border-gray-200 border-t-0 overflow-hidden">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';
import { slideToggle } from '@/utils/helpers';

defineProps<{
    title: string;
    hasErrors?: boolean;
}>();

const emits = defineEmits<{
    (e: 'on-change', value: boolean): void;
}>();

const isActive = ref<boolean>(false);

const toggleActive = (e: any) => {
    isActive.value = !isActive.value;
    slideToggle(e);
    emits('on-change', isActive.value);
};
</script>

<style lang="scss" scoped>
.transition-3 {
    transition: all 0.3s ease-in-out;
}
.collapse-container {
    transition: all 0.3s ease-in-out;

    &:not(.active) {
        @apply hidden p-0;
    }
}
</style>

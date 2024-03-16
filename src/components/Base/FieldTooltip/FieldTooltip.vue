<template>
    <div class="tooltip">
        <ExclamationCircleIcon
            class="w-4 h-4 text-gray-300"
            @mouseenter="isTooltipShown = true"
            @mouseleave="isTooltipShown = false"
        />

        <p
            class="absolute flex justify-center items-center bg-white max-w-[200px] w-max px-4 py-2 rounded-md shadow-md transition-all z-[1] m-0"
            :class="{
                'opacity-100': isTooltipShown,
                'opacity-0 invisible': !isTooltipShown,
                'bottom-full left-0 translate-y-[-0.5rem] translate-x-[calc(-50%+0.5rem)]':
                    !tooltipPosition || tooltipPosition === 'top',
                'top-full left-0 translate-y-[0.5rem] translate-x-[calc(-50%+0.5rem)]': tooltipPosition === 'bottom',
                'left-full top-0 translate-x-[0.5rem] translate-y-[calc(-50%+0.5rem)]': tooltipPosition === 'right',
                'right-full top-0 translate-x-[-0.5rem] translate-y-[calc(-50%+0.5rem)]': tooltipPosition === 'left',
                'right-full top-0 translate-x-[-0.5rem] translate-y-[calc(-100%+0.5rem)]':
                    tooltipPosition === 'top-right',
            }"
        >
            <span
                class="text-xs text-gray-700 font-normal"
                :class="{
                    'text-center': !textPosition || textPosition === 'center',
                    'text-left': textPosition === 'left',
                }"
                v-html="tooltip"
            ></span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';

defineProps<{
    tooltip: string;
    tooltipPosition?: string;
    textPosition?: string;
}>();

let isTooltipShown = ref(false);
</script>

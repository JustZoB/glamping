<template>
    <div
        class="fixed max-w-[1920px] w-[calc(100%-32px)] left-[calc(50%+16px)] translate-x-[calc(-50%-16px)] transition-all z-[100] bg-white p-7 rounded-t-lg sm:px-4 sm:py-5 sm:w-[calc(100%-8px)] sm:left-[calc(50%+4px)] sm:translate-x-[calc(-50%-4px)]"
        :class="visible ? 'bottom-0' : 'bottom-[-100%]'"
    >
        <div class="flex flex-col h-[92vh]">
            <div class="flex justify-between items-center">
                <h2 v-if="title" class="text-xl font-semibold">{{ title }}</h2>

                <button type="button" class="self-end button-sm bg-red-500 text-white" @click="emits('on-close')">
                    {{ $t('button.close') }}
                </button>
            </div>

            <div class="flex-1 overflow-y-auto overflow-x-hidden gap-3 pt-7 mt-3 pl-[2px] pr-4 custom-scrollbar">
                <slot></slot>
            </div>
        </div>
    </div>
    <div
        class="fixed left-0 right-0 h-full bg-gray-500 transition-all z-[99]"
        :class="visible ? 'bg-opacity-30 bottom-0' : 'bg-opacity-0 bottom-[-100%]'"
    ></div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue';
import { hideScrollBar, showScrollBar } from '@/utils/scroll-bar';

const props = defineProps<{
    title?: string;
    visible: boolean;
}>();

const emits = defineEmits(['on-close']);

onMounted(() => {
    document.addEventListener('keyup', handleClose);
});

onUnmounted(() => {
    document.removeEventListener('keyup', handleClose);
});

const handleClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        emits('on-close');
    }
};

watch(
    () => props.visible,
    async (newValue) => {
        if (newValue) {
            hideScrollBar();
        } else {
            showScrollBar();
        }
    }
);
</script>

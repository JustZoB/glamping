<template>
    <div
        v-if="isShown"
        class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 flex justify-center items-center z-[200]"
        @mousedown.self="handleCloseModal"
    >
        <div class="relative bg-white rounded-lg shadow-lg flex flex-col p-6 z-[201]">
            <XMarkIcon class="absolute right-4 top-4 cursor-pointer w-7 h-7 z-[202]" @click="handleCloseModal" />
            <div class="flex mb-3 pb-3 border-b border-gray-200">
                <h3 class="text-lg font-medium">{{ $t('deleting-confirm.title') }}</h3>
            </div>
            <p class="mb-4">{{ $t('deleting-confirm.description') }}</p>
            <div class="flex gap-4 justify-end">
                <button type="button" class="button-sm bg-gray-300 text-white" @click="handleCloseModal">
                    {{ $t('button.cancel') }}
                </button>
                <button type="button" class="button-sm bg-red-400 text-white" @click="handleDelete">
                    {{ $t('button.delete') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
    isShown: boolean;
    rows: any;
}>();

const emits = defineEmits<{
    (e: 'on-close'): void;
    (e: 'on-confirm', rows: any): void;
}>();

function handleCloseModal() {
    emits('on-close');
}

function handleDelete() {
    emits('on-confirm', props.rows);
}
</script>

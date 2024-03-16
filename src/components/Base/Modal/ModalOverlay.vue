<template>
    <div
        class="modal-wrapper z-[202] flex justify-center items-center bg-black bg-opacity-50 w-full h-full fixed left-0 top-0"
        @mousedown.self="() => emits('closeModal')"
    >
        <div
            class="modal custom-scrollbar min-w-[600px] max-h-[600px] sm:min-w-[unset] sm:w-full sm:mx-3 bg-white px-4 rounded-md shadow-md overflow-y-auto"
        >
            <div class="modal-header font-bold flex bg-white sticky top-0 z-[1] pt-4 pb-2">
                <div class="w-full">
                    <slot name="header"></slot>
                </div>
                <div class="w-[22px]">
                    <button type="button" class="cursor-pointer absolute top-0 right-0" @click="emits('closeModal')">
                        <XMarkIcon class="inline w-[22px]" />
                    </button>
                </div>
            </div>
            <slot name="body"></slot>
            <div class="modal-footer font-bold flex bg-white sticky bottom-0 z-[1] pt-2 pb-4">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

const emits = defineEmits<{
    (e: 'closeModal'): void;
}>();
</script>

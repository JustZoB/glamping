<template>
    <div>
        <img
            :src="typeof image === 'string' ? image : image.url"
            alt="image"
            class="w-full h-full object-cover"
            :style="{ width: `${width}px`, height: `${height}px`, aspectRatio }"
        />

        <label
            class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center text-gray-300 hover:text-primary-800"
            :tabindex="disabled ? -1 : 0"
            :class="{ 'pointer-events-none opacity-60': disabled }"
            @mouseenter="isTooltipDeleteShown = true"
            @mouseleave="isTooltipDeleteShown = false"
            @click="handleDeleteImage"
        >
            <XMarkIcon class="w-4 h-4" />
            <p
                class="absolute flex justify-center items-center bottom-full right-2 bg-white max-w-[200px] w-max mb-2 px-4 py-2 rounded-md shadow-lg transition-all"
                :class="isTooltipDeleteShown ? 'opacity-100' : 'opacity-0 invisible'"
            >
                <span class="text-xs text-center text-gray-700">
                    {{ deleteTooltip ?? $t('input.delete-tooltip.image') }}
                </span>
            </p>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import type { IUploadImage } from '@/types/base';

const props = defineProps<{
    image: string | IUploadImage;
    idx: number;
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
    deleteTooltip?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (event: 'delete', idx: number): void;
}>();

let isTooltipDeleteShown = ref(false);

const handleDeleteImage = () => {
    if (props.disabled) {
        return false;
    }

    emit('delete', props.idx);
};
</script>

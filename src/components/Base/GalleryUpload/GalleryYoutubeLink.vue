<template>
    <div class="w-full" :style="{ aspectRatio }">
        <div class="flex flex-col w-full h-full">
            <div class="flex items-center gap-2 pt-2 mb-3">
                <IconYoutube class="w-4 h-4" />
                <p>YouTube</p>
            </div>

            <TextField
                v-if="typeof file.value === 'string'"
                :model-value="file.value"
                type="text"
                input-name="url"
                class="mb-3"
                @update:model-value="handleChangeLink"
            />

            <iframe
                v-if="file.value && typeof file.value === 'string'"
                width="300"
                height="330"
                :src="file.value"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="max-w-full flex-[1]"
            ></iframe>
        </div>

        <label
            class="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[30px] h-[30px] bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center text-gray-300 hover:text-primary-800"
            :tabindex="disabled ? -1 : 0"
            :class="{ 'pointer-events-none opacity-60': disabled }"
            @mouseenter="isTooltipDeleteShown = true"
            @mouseleave="isTooltipDeleteShown = false"
            @click="handleDeleteLink"
        >
            <XMarkIcon class="w-4 h-4" />
            <p
                class="absolute flex justify-center items-center bottom-full right-2 bg-white max-w-[200px] w-max mb-2 px-4 py-2 rounded-md shadow-lg transition-all"
                :class="isTooltipDeleteShown ? 'opacity-100' : 'opacity-0 invisible'"
            >
                <span class="text-xs text-center text-gray-700">
                    {{ $t('input.delete-tooltip.youtube-link') }}
                </span>
            </p>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import TextField from '@/components/Base/TextField/TextField.vue';
import IconYoutube from '@/components/Icons/Social/IconYoutube.vue';
import type { IUploadFile } from '@/types/base';

const props = defineProps<{
    file: IUploadFile;
    idx: number;
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (event: 'on-change', idx: number, link: string): void;
    (event: 'delete', idx: number): void;
}>();

let isTooltipDeleteShown = ref(false);

const handleChangeLink = (link: string) => {
    if (props.disabled) {
        return false;
    }

    let embed = link;

    if (link.indexOf('watch?v=') !== -1) {
        embed = 'https://www.youtube.com/embed/' + link.split('watch?v=')[1];
    } else if (link.indexOf('youtu.be/') !== -1) {
        embed = 'https://www.youtube.com/embed/' + link.split('youtu.be/')[1];
    }

    emit('on-change', props.idx, embed);
};

const handleDeleteLink = () => {
    if (props.disabled) {
        return false;
    }

    emit('delete', props.idx);
};
</script>

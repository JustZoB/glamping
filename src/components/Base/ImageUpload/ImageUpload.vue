<template>
    <div ref="imageBlock">
        <div v-if="name" class="flex items-center gap-2 mb-2" :class="{ 'opacity-0': isPreload }">
            <p class="text-gray-700 text-base font-medium">
                {{ name }}
                <span v-if="required" class="text-red-400"> *</span>
            </p>
            <FieldTooltip v-if="tooltip" :tooltip="tooltip" />
        </div>

        <div
            class="border-[3px] border-white shadow-lg"
            :class="{
                'border-white': !errors?.length,
                'bg-red-500 bg-opacity-10 border-red-500 focus:border-red-500 focus:border-opacity-50': errors?.length,
                'bg-opacity-0 border-dashed border-blue-500': isDragging,
                'opacity-0': isPreload,
            }"
            :style="{ width: `${width}px`, height: `${height}px`, aspectRatio }"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="dropImage"
        >
            <img
                v-if="url || modelValue"
                :src="url ? url : modelValue"
                alt="Image"
                class="w-full h-full object-cover"
            />

            <div v-else class="p-[5%] w-full h-full">
                <ImageDefault class="w-full h-full" />
            </div>

            <label
                class="absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] w-[30px] h-[30px] bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center text-gray-300 hover:text-primary-800"
                :tabindex="disabled ? -1 : 0"
                :class="{ 'pointer-events-none opacity-60': disabled }"
                @mouseenter="isTooltipEditShown = true"
                @mouseleave="isTooltipEditShown = false"
            >
                <PencilIcon v-if="url || modelValue" class="w-4 h-4" />
                <PlusIcon v-else class="w-4 h-4" />
                <p
                    class="absolute flex justify-center items-center bottom-full right-2 bg-white max-w-[200px] w-max mb-2 px-4 py-2 rounded-md shadow-lg transition-all"
                    :class="isTooltipEditShown ? 'opacity-100' : 'opacity-0 invisible'"
                >
                    <span v-if="url || modelValue" class="text-xs text-center text-gray-700">
                        {{ editTooltip ?? $t('input.edit-tooltip.image') }}
                    </span>
                    <span v-else class="text-xs text-center text-gray-700">
                        {{ addTooltip ?? $t('input.add-tooltip.image') }}
                    </span>
                </p>
                <input type="file" name="image" accept=".png, .jpg, .jpeg" class="hidden" @change="handleInput" />
            </label>

            <label
                v-if="url || modelValue"
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

            <div class="input-errors absolute right-4 top-4 z-[1] flex gap-2" v-for="error of errors" :key="error.$uid">
                <p class="error-msg text-red-500">{{ error.$message }}</p>
            </div>
        </div>

        <ContentLoader
            v-if="isPreload"
            class="absolute z-[1] top-0 left-0"
            :viewBox="`0 0 ${loaderWidth} ${loaderHeight + 4}`"
        >
            <rect v-if="name" x="0" y="0" rx="1" ry="1" :width="loaderWidth / 3" height="4" />
            <rect x="0" :y="name ? 6 : 0" rx="1" ry="1" :width="loaderWidth" :height="loaderHeight - 6" />
            <circle :cx="loaderWidth - 1" cy="6" r="2" />
        </ContentLoader>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/vue/24/solid';
import { ContentLoader } from 'vue-content-loader';
import FieldTooltip from '@/components/Base/FieldTooltip/FieldTooltip.vue';
import ImageDefault from '@/components/Base/SvgImages/ImageDefault/ImageDefault.vue';

const toast = useToast();
const { t } = useI18n();

const props = defineProps<{
    name?: string;
    modelValue?: File | string | null;
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
    tooltip?: string;
    addTooltip?: string;
    editTooltip?: string;
    deleteTooltip?: string;
    errors?: any[];
    required?: any;
    disabled?: boolean;
    isPreload?: boolean;
}>();

const url = ref();
const isDragging = ref<boolean>(false);
const isTooltipEditShown = ref(false);
const isTooltipDeleteShown = ref(false);

const imageBlock = ref<HTMLElement | null>(null);
const loaderWidth = ref<number>(125);
const loaderHeight = ref<number>(50);
const aspectRatioNumbers = ref<string[]>(['1', '1']);

onMounted(() => {
    if (props.aspectRatio) {
        aspectRatioNumbers.value = props.aspectRatio?.split('/');
    }

    const imageWidth = imageBlock.value?.clientWidth ? imageBlock.value.clientWidth : 1400;

    loaderWidth.value = imageWidth / 6;
    loaderHeight.value = (loaderWidth.value / +aspectRatioNumbers.value[0]) * +aspectRatioNumbers.value[1] + 6;
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: File | null): void;
}>();

const dragover = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
};

const dragleave = () => {
    isDragging.value = false;
};

const dropImage = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer) {
        const file = e.dataTransfer.files[0];

        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            url.value = URL.createObjectURL(file);
            emit('update:modelValue', e.dataTransfer.files[0]);
        } else {
            toast.error(t('toast.image-file-type-not-available'));
        }
    }

    isDragging.value = false;
};

const handleInput = (e: any) => {
    if (e.target) {
        const file = e.target.files[0];
        url.value = URL.createObjectURL(file);
        emit('update:modelValue', e.target.files[0]);
    }
};

const handleDeleteImage = () => {
    url.value = null;
    isTooltipDeleteShown.value = false;
    emit('update:modelValue', null);
};
</script>

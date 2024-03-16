<template>
    <div class="w-full">
        <div v-if="name" class="flex items-center gap-2 mb-2">
            <p class="text-gray-700 text-base font-medium" :class="{ 'opacity-0': isPreload }">
                {{ name }}
                <span v-if="required" class="text-red-400"> *</span>
            </p>
            <FieldTooltip v-if="tooltip" :tooltip="tooltip" />
        </div>

        <div
            ref="galleryBlock"
            class="w-full border-[2px] rounded-md shadow-lg p-2.5"
            :class="{
                'border-white': !errors?.length,
                'bg-red-500 bg-opacity-10 border-red-500 focus:border-red-500 focus:border-opacity-50': errors?.length,
                'border-[2px] border-dashed border-blue-500': isDragging,
                'opacity-0': isPreload,
            }"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="dropFile"
        >
            <label
                class="absolute top-0 right-0 translate-x-1/2 translate-y-[-50%] w-[30px] h-[30px] bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center text-gray-300 hover:text-primary-800"
                :tabindex="disabled ? -1 : 0"
                :class="{ 'pointer-events-none opacity-60': disabled }"
                @mouseenter="isTooltipAddShown = true"
                @mouseleave="isTooltipAddShown = false"
            >
                <PlusIcon class="w-4 h-4" />
                <span
                    class="absolute flex justify-center items-center bottom-full right-2 bg-white max-w-[200px] w-max mb-2 px-4 py-2 rounded-md shadow-lg transition-all"
                    :class="isTooltipAddShown ? 'opacity-100' : 'opacity-0 invisible'"
                >
                    <span class="text-xs text-center text-gray-700">
                        {{ addTooltip ?? $t('input.add-tooltip.file') }}
                    </span>
                </span>
                <input
                    multiple
                    type="file"
                    name="images"
                    :accept="props.formats"
                    class="hidden"
                    :disabled="disabled"
                    @change="handleChange"
                />
            </label>

            <label
                v-if="isYoutubeActive"
                class="absolute top-0 right-[36px] translate-x-1/2 translate-y-[-50%] w-[30px] h-[30px] bg-white rounded-full shadow-lg cursor-pointer flex items-center justify-center text-gray-300 hover:text-primary-800 z-[1]"
                :tabindex="disabled ? -1 : 0"
                :class="{ 'pointer-events-none opacity-60': disabled }"
                @mouseenter="isYouTubeTooltipAddShown = true"
                @mouseleave="isYouTubeTooltipAddShown = false"
                @click="handleAddYouTubeLink"
            >
                <IconYoutube class="w-4 h-4" />
                <span
                    class="absolute flex justify-center items-center bottom-full right-2 bg-white max-w-[200px] w-max mb-2 px-4 py-2 rounded-md shadow-lg transition-all"
                    :class="isYouTubeTooltipAddShown ? 'opacity-100' : 'opacity-0 invisible'"
                >
                    <span class="text-xs text-center text-gray-700">
                        {{ $t('input.add-tooltip.youtube-link') }}
                    </span>
                </span>
            </label>

            <draggable
                v-if="gallery?.length"
                :group="{ name: 'gallery' }"
                tag="div"
                :list="gallery"
                :disabled="disabled"
                class="grid grid-cols-6 gap-4 xl:grid-cols-3 md:grid-cols-1"
                :animation="200"
                ghostClass="ghost"
                :forceFallback="true"
                :fallbackOnBody="true"
                fallbackClass="rotate-[7deg]"
            >
                <template #item="{ element, index }">
                    <div>
                        <GalleryYoutubeLink
                            v-if="element?.type === 'youtube_url'"
                            :file="element"
                            :idx="index"
                            :width="width"
                            :height="height"
                            :aspectRatio="aspectRatio"
                            :disabled="disabled"
                            class="cursor-move"
                            :class="{ 'cursor-auto': disabled }"
                            @on-change="handleChangeLink"
                            @delete="handleDeleteImage"
                        />

                        <GalleryImage
                            v-else-if="element?.type === 'image'"
                            :image="element"
                            :idx="index"
                            :width="width"
                            :height="height"
                            :aspectRatio="aspectRatio"
                            :disabled="disabled"
                            class="cursor-move"
                            :class="{ 'cursor-auto': disabled }"
                            @delete="handleDeleteImage"
                        />

                        <GalleryVideo
                            v-else-if="element?.type === 'video'"
                            :file="element"
                            :idx="index"
                            :width="width"
                            :height="height"
                            :aspectRatio="aspectRatio"
                            :disabled="disabled"
                            class="cursor-move"
                            :class="{ 'cursor-auto': disabled }"
                            @delete="handleDeleteImage"
                        />
                    </div>
                </template>
            </draggable>

            <div v-else class="flex items-center justify-center min-h-[100px]">
                <p
                    class="text-gray-700 text-base text-center font-medium max-w-[400px]"
                    v-html="$t('input.empty.gallery')"
                ></p>
            </div>

            <div class="input-errors absolute right-4 top-4 z-[1] flex gap-2" v-for="error of errors" :key="error.$uid">
                <p class="error-msg text-red-500">{{ error.$message }}</p>
            </div>
        </div>

        <ContentLoader v-if="isPreload" class="absolute z-[1] top-0 left-0" :viewBox="`0 0 ${loaderWidth} 30`">
            <rect v-if="name" x="0" y="0" rx="1" ry="1" :width="loaderWidth / 3" height="4" />
            <rect x="0" :y="name ? 6 : 0" rx="1" ry="1" :width="loaderWidth" height="24" />
            <circle :cx="loaderWidth - 1" cy="6" r="2" />
        </ContentLoader>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import draggable from 'vuedraggable';
import { ContentLoader } from 'vue-content-loader';
import { PlusIcon } from '@heroicons/vue/24/solid';
import FieldTooltip from '@/components/Base/FieldTooltip/FieldTooltip.vue';
import GalleryImage from '@/components/Base/GalleryUpload/GalleryImage.vue';
import GalleryVideo from '@/components/Base/GalleryUpload/GalleryVideo.vue';
import GalleryYoutubeLink from '@/components/Base/GalleryUpload/GalleryYoutubeLink.vue';
import IconYoutube from '@/components/Icons/Social/IconYoutube.vue';
import type { IUploadFile, FileType } from '@/types/base';

const toast = useToast();
const { t } = useI18n();

interface IProps {
    name?: string;
    modelValue: IUploadFile[];
    width?: number | string;
    height?: number | string;
    aspectRatio?: string;
    tooltip?: string;
    addTooltip?: string;
    deleteTooltip?: string;
    disabled?: boolean;
    errors?: any[];
    required?: any;
    isPreload?: boolean;
    formats?: string;
    isYoutubeActive?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    formats: '.png,.jpg,.jpeg,.webp',
});

const IMAGE_FORMATS: string = 'jpg,jpeg,png,webp';
const VIDEO_FORMATS: string = 'mp4,avi';

const isDragging = ref<boolean>(false);
const galleryBlock = ref<HTMLElement | null>(null);
const loaderWidth = ref<number>(125);
const aspectRatioNumbers = ref<string[]>(['1', '1']);

const gallery = computed<(string | IUploadFile)[]>(() => {
    return props.modelValue ?? [];
});

const emits = defineEmits<{
    (event: 'update:modelValue', payload: (string | IUploadFile)[]): void;
    (event: 'on-delete', id: number): void;
}>();

onMounted(() => {
    if (props.aspectRatio) {
        aspectRatioNumbers.value = props.aspectRatio?.split('/');
    }

    const componentWidth = galleryBlock.value?.clientWidth ? galleryBlock.value.clientWidth : 1400;

    loaderWidth.value = componentWidth / 6;
});

let isTooltipAddShown = ref(false);
let isYouTubeTooltipAddShown = ref(false);

const dragover = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;
};

const dragleave = () => {
    isDragging.value = false;
};

const dropFile = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer) {
        const files: IUploadFile[] = [];

        [...e.dataTransfer.files].forEach((file: File) => {
            const isValidFormat = validateFormats(file);

            if (isValidFormat) {
                files.push({ value: file, url: buildBlob(file), type: getFileType(file.type) });
            } else {
                toast.error(t('toast.image-file-type-not-available'));
            }
        });

        emits(`update:modelValue`, [...gallery.value, ...files]);
    }

    isDragging.value = false;
};

const handleChange = (e: any) => {
    if (props.disabled) {
        return false;
    }

    const { files } = e.target;
    const tempFiles: IUploadFile[] = [];

    [...files].forEach((file: File) => {
        tempFiles.push({ value: file, url: buildBlob(file), type: getFileType(file.type) });
    });

    emits(`update:modelValue`, [...gallery.value, ...tempFiles]);
};

const handleDeleteImage = (idx: number) => {
    if (props.disabled) {
        return false;
    }

    const image = gallery.value[idx];

    if (typeof image !== 'string' && props.modelValue) {
        const id = image.id;
        if (id) emits('on-delete', id);
    }

    gallery.value.splice(idx, 1);
    emits('update:modelValue', gallery.value);
};

const handleChangeLink = (idx: number, link: string) => {
    if (props.disabled) {
        return false;
    }

    const file: IUploadFile = gallery.value[idx] as IUploadFile;
    file.value = link;

    emits('update:modelValue', gallery.value);
};

function validateFormats(file: File): Boolean {
    let isValidFormat = false;
    const validFormats = props.formats.split(',');

    for (let i = 0; i < validFormats.length; i++) {
        const withoutDot = validFormats[i].replace('.', '');

        if (`image/${withoutDot}` === file.type || `video/${withoutDot}` === file.type) {
            isValidFormat = true;
            break;
        }
    }

    return isValidFormat;
}

function buildBlob(file: File): string {
    let blob: string | ArrayBuffer = '';

    if (getType(file.name) === 'image') {
        blob = URL.createObjectURL(new Blob([file]));
    } else {
        blob = URL.createObjectURL(file);
    }

    return blob;
}

function getFileType(type: string): FileType | undefined {
    if (type.indexOf('image') >= 0) {
        return 'image';
    } else if (type.indexOf('video') >= 0) {
        return 'video';
    } else if (type.indexOf('youtube_url') >= 0) {
        return 'youtube_url';
    } else {
        return undefined;
    }
}

function getType(fileName: string): string {
    let type = 'image';
    const splitted: string[] = fileName.split('.');
    const extension = splitted[splitted.length - 1];

    if (IMAGE_FORMATS.includes(extension)) {
        type = 'image';
    } else if (VIDEO_FORMATS.includes(extension)) {
        type = 'video';
    }

    return type;
}

function handleAddYouTubeLink() {
    emits(`update:modelValue`, [...gallery.value, { type: 'youtube_url', value: '' }]);
}
</script>

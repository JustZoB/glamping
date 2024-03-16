<template>
    <div>
        <div
            v-if="name"
            class="flex items-center gap-2 mb-2 text-gray-700 text-base font-medium"
            :class="[nameClass, { 'opacity-0': isPreload }]"
        >
            <p>
                {{ name }}
                <span v-if="required" class="text-red-400"> *</span>
            </p>
            <FieldTooltip v-if="tooltip" :tooltip="tooltip" :tooltipPosition="tooltipPosition" />
        </div>

        <div class="relative">
            <textarea
                ref="textarea"
                :autocomplete="type"
                :type="type"
                :value="modelValue"
                class="w-full rounded-md px-4 py-3 text-[15px] min-h-[120px] transition-all border-2 resize-none"
                :class="[
                    textareaClass,
                    {
                        'bg-white border-gray-100 focus:border-gray-200': !errors?.length,
                        'bg-red-500 bg-opacity-10 border-red-500 focus:border-red-500 focus:border-opacity-50':
                            errors?.length,
                        'bg-gray-100 cursor-not-allowed': disabled,
                        'opacity-0': isPreload,
                    },
                ]"
                :placeholder="placeholder"
                :disabled="disabled"
                @input="handleInput"
            ></textarea>

            <div
                class="input-errors absolute top-1/2 right-3 translate-y-[-50%] flex gap-2"
                v-for="error of errors"
                :key="error.$uid"
            >
                <p class="error-msg text-red-500">{{ error.$message }}</p>
            </div>
        </div>

        <ContentLoader v-if="isPreload" class="absolute z-[1] top-0 left-0" :viewBox="`0 0 ${loaderWidth} 17`">
            <rect v-if="name" x="0" y="0" rx="1" ry="1" :width="loaderWidth / 3" height="4" />
            <rect x="0" :y="name ? 5.5 : 0" rx="1" ry="1" :width="loaderWidth" height="14" />
        </ContentLoader>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { ContentLoader } from 'vue-content-loader';
import FieldTooltip from '@/components/Base/FieldTooltip/FieldTooltip.vue';
import type { Ref } from 'vue';

const props = defineProps<{
    type: string;
    name?: string;
    placeholder?: string;
    tooltip?: string;
    modelValue: string;
    tooltipPosition?: string;
    textareaClass?: string;
    nameClass?: string;
    disabled?: boolean;
    autofocus?: boolean;
    errors?: any[];
    required?: any;
    isShowing?: boolean;
    isPreload?: boolean;
}>();

const resizeTextarea = (element: Ref<HTMLTextAreaElement | null>) => {
    if (!element.value) return;

    element.value.style.height = 'auto';
    element.value.style.height = element.value.scrollHeight + 4 + 'px';
};

const textarea = ref<HTMLTextAreaElement | null>(null);
watchEffect((onInvalidate) => {
    if (!textarea.value) return;

    textarea.value.addEventListener('input', () => resizeTextarea(textarea));
    onInvalidate(() => {
        if (textarea.value) textarea.value.removeEventListener('input', () => resizeTextarea(textarea));
    });
});

watch(
    () => props.isShowing,
    async (isShowing) => {
        if (isShowing) resizeTextarea(textarea);
    }
);

const loaderWidth = ref<number>(250);

onMounted(() => {
    loaderWidth.value = textarea.value?.clientWidth ? textarea.value?.clientWidth / 6 : 250;
    if (props.autofocus) textarea.value?.focus();
});

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>();

const handleInput = (e: any) => {
    emit('update:modelValue', e.target.value);
};
</script>

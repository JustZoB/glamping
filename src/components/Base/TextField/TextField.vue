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

            <FieldTooltip
                v-if="tooltip"
                :tooltip="tooltip"
                :tooltipPosition="tooltipPosition"
                :textPosition="tooltipTextPosition"
            />
        </div>

        <div class="relative">
            <input
                ref="input"
                :type="type"
                :value="modelValue"
                :name="inputName"
                :min="(min as number)"
                :max="(max as number)"
                :style="{ paddingRight: `${addon ? addonWidth + 12 : 12}px` }"
                class="rounded-md w-full px-3 py-2.5 text-15 transition-all border-2"
                :class="[
                    inputClass,
                    {
                        'bg-white border-gray-100 focus:border-gray-200':
                            !successes?.length && !warnings?.length && !errors?.length,
                        'bg-green-400 bg-opacity-10 border-green-400 focus:border-green-400 focus:border-opacity-50':
                            successes?.length,
                        'bg-yellow-400 bg-opacity-10 border-yellow-400 focus:yellow-red-400 focus:border-opacity-50':
                            warnings?.length,
                        'bg-red-500 bg-opacity-10 border-red-500 focus:border-red-500 focus:border-opacity-50':
                            errors?.length,
                        'bg-gray-100 cursor-not-allowed': disabled,
                        'opacity-0': isPreload,
                    },
                ]"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :disabled="disabled"
                @focus="rememberPreviousValue"
                @blur="handleBlur"
                @input="handleInput"
            />

            <div
                v-if="addon"
                ref="addonRef"
                class="flex items-center absolute right-[2px] top-[2px] h-[calc(100%-4px)] px-3 bg-gray-200 border-l border-gray-100 rounded-r"
                :class="{ 'opacity-0': isPreload }"
            >
                <p class="mb-0 text-base text-gray-500">{{ addon }}</p>
            </div>

            <div
                class="input-errors absolute top-1/2 translate-y-[-50%] flex gap-2"
                :style="{
                    right:
                        type === 'date' || type === 'number'
                            ? `${addon ? addonWidth + 12 + 30 : 12 + 30}px`
                            : `${addon ? addonWidth + 12 : 12}px`,
                }"
                :class="[errorsClass]"
                v-for="error of errors"
                :key="error.$uid"
            >
                <p class="error-msg text-red-500">{{ error.$message }}</p>
            </div>

            <FieldTooltip
                v-if="!name && tooltip"
                :tooltip="tooltip"
                :tooltipPosition="tooltipPosition"
                :textPosition="tooltipTextPosition"
                class="absolute right-3 top-1/2 translate-y-[-50%]"
            />
        </div>

        <ContentLoader v-if="isPreload" class="absolute z-[1] top-0 left-0" :viewBox="`0 0 ${loaderWidth} 15`">
            <rect v-if="name" x="0" y="0" rx="1" ry="1" :width="loaderWidth / 3" height="4" />
            <rect x="0" :y="name ? 5.5 : 0" rx="1" ry="1" :width="loaderWidth" height="8" />
        </ContentLoader>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ContentLoader } from 'vue-content-loader';
import { ErrorObject } from '@vuelidate/core';
import FieldTooltip from '@/components/Base/FieldTooltip/FieldTooltip.vue';
import { replaceRussianPhonePrefix } from '@/utils/phone-mask';

const props = defineProps<{
    type: string;
    name?: string;
    min?: number | Date | null;
    max?: number | Date | null;
    inputName?: string;
    autocomplete?: string;
    placeholder?: string;
    tooltip?: string;
    tooltipPosition?: string;
    tooltipTextPosition?: string;
    inputClass?: string;
    nameClass?: string;
    modelValue?: string | number | Date | string[] | null;
    disabled?: boolean;
    autofocus?: boolean;
    addon?: string;
    successes?: ErrorObject[];
    warnings?: ErrorObject[];
    errors?: ErrorObject[];
    errorsClass?: string;
    required?: any;
    isPreload?: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', payload: any): void;
    (event: 'blur', payload: any): void;
}>();

const input = ref<HTMLInputElement | null>(null);
const addonRef = ref<HTMLDivElement | null>(null);

const addonWidth = ref<number>(0);
const loaderWidth = ref<number>(125);

const previousValue = ref<any>();

onMounted(() => {
    loaderWidth.value = input.value?.clientWidth ? input.value?.clientWidth / 6 : 125;
    if (props.autofocus) input.value?.focus();

    if (addonRef.value) addonWidth.value = addonRef.value.clientWidth;
});

const rememberPreviousValue = async (e: any) => {
    previousValue.value = e.target.value;
};

const handleBlur = async (e: any) => {
    let value = e.target.value;
    value = replaceRussianPhonePrefix(value, props.type);

    if (previousValue.value !== value) emit('blur', value);
};

const handleInput = async (e: any) => {
    let value = e.target.value;
    value = replaceRussianPhonePrefix(value, props.type);

    emit('update:modelValue', value);
};
</script>

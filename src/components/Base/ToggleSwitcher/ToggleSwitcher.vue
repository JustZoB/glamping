<template>
    <div class="flex flex-col">
        <div v-if="name" ref="toggleName" class="relative mb-3">
            <p class="text-gray-700 font-medium text-base" :class="{ 'opacity-0': isPreload }">{{ name }}</p>

            <ContentLoader v-if="isPreload" class="absolute z-[1] top-0 left-0" :viewBox="`0 0 ${loaderWidth} 3.5`">
                <rect x="0" y="0" rx="1" ry="1" :width="loaderWidth" height="3.5" />
            </ContentLoader>
        </div>

        <label
            class="relative inline-block"
            :class="{
                'w-16 h-9': size === undefined || size === 'md',
                'w-12 h-7': size === 'sm',
                'w-8 h-5': size === 'xs',
            }"
        >
            <input
                v-model="toggleValue"
                type="checkbox"
                :name="inputName ?? 'checkbox'"
                :disabled="disabled"
                class="opacity-0 w-0 h-0 peer"
                @change="onChange"
            />

            <span
                class="absolute cursor-pointer top-0 bottom-0 left-0 right-0 transition-colors rounded-3xl peer-focus:outline-solid"
                :class="{
                    'bg-blue-400': toggleValue,
                    'bg-gray-100': !toggleValue,
                    'bg-opacity-60 cursor-not-allowed': disabled,
                    'opacity-0': isPreload,
                }"
            >
                <span
                    class="absolute bg-white left-1 bottom-1 transition-transform rounded-full"
                    :class="{
                        'w-7 h-7': size === undefined || size === 'md',
                        'w-5 h-5': size === 'sm',
                        'w-3 h-3': size === 'xs',
                        'translate-x-3': size === 'xs' && toggleValue,
                        'translate-x-5': size === 'sm' && toggleValue,
                        'translate-x-7': (size === undefined || size === 'md') && toggleValue,
                    }"
                ></span>
            </span>

            <ContentLoader v-if="isPreload" class="absolute z-[1] top-0 left-0" :viewBox="`0 0 6 3.5`">
                <rect x="0" y="0" rx="1.6" ry="1.6" width="6" height="3.5" />
            </ContentLoader>
        </label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { ContentLoader } from 'vue-content-loader';

const props = defineProps<{
    id?: number;
    value: boolean;
    name?: string;
    inputName?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    isPreload?: boolean;
}>();

const toggleName = ref<HTMLElement | null>(null);
const loaderWidth = ref<number>(20);

const emits = defineEmits<{
    (e: 'on-change', value: boolean, id?: number): void;
}>();

const toggleValue = ref<boolean>(false);

onMounted(() => {
    loaderWidth.value = toggleName.value?.clientWidth ? toggleName.value?.clientWidth / 6 : 20;
    toggleValue.value = props.value;
});

watch(
    () => props.value,
    (value) => {
        toggleValue.value = value;
    }
);

const onChange = () => {
    emits('on-change', toggleValue.value, props.id);
};
</script>

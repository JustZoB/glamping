<template>
    <div class="relative" ref="vueSelect">
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

        <slot></slot>

        <div
            class="input-errors absolute right-10 bottom-0 translate-y-[-50%] flex gap-2"
            v-for="error of errors"
            :key="error.$uid"
        >
            <p class="error-msg text-red-500">{{ error.$message }}</p>
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
import FieldTooltip from '@/components/Base/FieldTooltip/FieldTooltip.vue';

defineProps<{
    name?: string;
    tooltip?: string;
    tooltipPosition?: string;
    nameClass?: string;
    errors?: any[];
    required?: any;
    isPreload?: boolean;
}>();

const vueSelect = ref<HTMLInputElement | null>(null);
const loaderWidth = ref<number>(125);

onMounted(() => {
    loaderWidth.value = vueSelect.value?.clientWidth ? vueSelect.value?.clientWidth / 6 : 125;
});
</script>

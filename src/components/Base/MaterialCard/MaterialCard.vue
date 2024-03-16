<template>
    <div class="flex items-center justify-around px-4 py-5">
        <div v-if="icon" class="flex justify-center w-1/3">
            <HeroIconDynamic :icon="icon" :style="{ color: iconColor }" class="w-6 h-6" />
        </div>
        <div class="flex flex-col justify-center w-2/3">
            <h5 class="text-xl font-semibold mb-2 text-center">{{ value }}</h5>
            <p class="text-sm text-center mb-0">{{ text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeroIconDynamic from '@/components/Base/HeroIconDynamic/HeroIconDynamic.vue';

defineProps<{
    value: string;
    text: string;
    icon: string;
    iconColor: string;
}>();
</script>

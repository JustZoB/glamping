<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 44 44" fill="none">
        <path :fill="iconColor" d="M22 43a21 21 0 1 0 0-42 21 21 0 0 0 0 42Z" />
        <path
            :fill="iconBackgroundColor"
            d="M25.3 35.13h4.57V8.86h-6.66c-6.7 0-10.22 3.44-10.22 8.5 0 4.02 1.93 6.43 5.37 8.88l-5.99 8.88h4.97L24 25.18l-2.32-1.54c-2.8-1.9-4.17-3.36-4.17-6.54 0-2.79 1.97-4.68 5.72-4.68h2.05v22.7h.01Z"
        />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    width?: number | string;
    height?: number | string;
    iconColor?: string;
    iconBackgroundColor?: string;
}

withDefaults(defineProps<Props>(), {
    width: 30,
    height: 30,
    iconColor: '#FC3F1D',
    iconBackgroundColor: '#FFFFFF',
});
</script>

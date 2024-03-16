<template>
    <svg :width="width" :height="height" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 0.872559C6.71573 0.872559 0 7.58828 0 15.8726C0 24.1568 6.71573 30.8726 15 30.8726C23.2843 30.8726 30 24.1568 30 15.8726C30 7.58828 23.2843 0.872559 15 0.872559ZM15.0989 6.12036L17.4628 13.5013L25.21 13.6753L18.9203 18.2017L21.1487 25.6248L14.8993 21.0416L8.52905 25.4563L10.957 18.0955L4.79003 13.4006L12.5409 13.4354L15.0989 6.12036V6.12036Z"
            :fill="iconCircleColor"
        ></path>
    </svg>
</template>

<script setup lang="ts">
interface Props {
    width?: number | string;
    height?: number | string;
    iconCircleColor?: string;
}

withDefaults(defineProps<Props>(), {
    width: 30,
    height: 31,
    iconCircleColor: 'currentColor',
});
</script>

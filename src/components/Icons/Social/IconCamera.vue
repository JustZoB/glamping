<template>
    <svg :width="width" :height="height" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15.5" cy="15.5" r="15.5" :fill="iconCircleColor"></circle>
        <path
            d="M23 14L20 16C20 15.393 19.724 14.856 19.297 14.489C20.3135 13.8765 21 12.773 21 11.5C21 9.56698 19.433 8 17.5 8C15.567 8 14 9.56701 14 11.5C14 12.4805 14.4055 13.3645 15.0555 14H13.2215C13.7005 13.4685 14 12.772 14 12C14 10.343 12.657 9 11 9C9.34301 9 8 10.343 8 12C8 12.904 8.4085 13.705 9.04099 14.255C8.4235 14.5955 8 15.245 8 16V20C8 21.1045 8.8955 22 10 22H18C19.1045 22 20 21.1045 20 20L23 22C23.5525 22 24 21.5525 24 21V15C24 14.4475 23.5525 14 23 14ZM11 14C9.8955 14 9 13.1045 9 12C9 10.8955 9.8955 10 11 10C12.1045 10 13 10.8955 13 12C13 13.1045 12.1045 14 11 14ZM17.5 14.0055C16.116 14.0055 14.9945 12.8835 14.9945 11.5C14.9945 10.116 16.1165 8.99451 17.5 8.99451C18.8835 8.99451 20.0055 10.116 20.0055 11.5C20.0055 12.884 18.884 14.0055 17.5 14.0055Z"
            :fill="iconColor"
        ></path>
    </svg>
</template>

<script setup lang="ts">
interface Props {
    width?: number | string;
    height?: number | string;
    iconColor?: string;
    iconCircleColor?: string;
}

withDefaults(defineProps<Props>(), {
    width: 31,
    height: 31,
    iconColor: '#FFFFFF',
    iconCircleColor: 'currentColor',
});
</script>

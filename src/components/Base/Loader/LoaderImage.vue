<template>
    <svg
        :width="width || defaultValues.width"
        :height="height || defaultValues.height"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0_155_1242)">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="url(#paint0_linear_155_1242)" stroke-width="2" />
        </g>
        <g clip-path="url(#clip1_155_1242)">
            <circle cx="7.5" cy="7.5" r="6.5" stroke="url(#paint1_linear_155_1242)" stroke-width="2" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_155_1242" x1="7.5" y1="0" x2="7.5" y2="15" gradientUnits="userSpaceOnUse">
                <stop offset="0.133594" :stop-color="color || defaultValues.color" stop-opacity="0.4" />
                <stop offset="0.866667" :stop-color="color || defaultValues.color" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_155_1242" x1="7.5" y1="0" x2="7.5" y2="15" gradientUnits="userSpaceOnUse">
                <stop offset="0.133594" :stop-color="color || defaultValues.color" stop-opacity="0.4" />
                <stop offset="0.866667" :stop-color="color || defaultValues.color" />
            </linearGradient>
            <clipPath id="clip0_155_1242">
                <rect width="7.5" height="15" fill="white" transform="translate(7.5)" />
            </clipPath>
            <clipPath id="clip1_155_1242">
                <rect width="7.5" height="15" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    width?: number;
    height?: number;
    color?: string;
}>();

const defaultValues = {
    width: 15,
    height: 15,
    color: '#292A2C',
};
</script>

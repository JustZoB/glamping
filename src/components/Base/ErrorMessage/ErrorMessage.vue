<template>
    <div class="bg-red-500 text-white rounded-md px-4 py-5 lg:px-3 lg:py-4">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message: string;
}>();
</script>

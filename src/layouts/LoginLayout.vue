<template>
    <div class="w-screen h-screen bg-slate-900 flex flex-col items-center">
        <div class="mt-6 p-8 lg:mt-4 lg:p-6">
            <LogoImage class="w-[200px] h-[97px] lg:w-[160px] lg:h-[78px]" />
        </div>
        <main class="flex flex-col items-center w-[inherit]">
            <div class="content max-w-[800px] w-full px-8 lg:max-w-[600px] lg:px-4">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import LogoImage from '@/components/Base/Logo/LogoImage.vue';
</script>

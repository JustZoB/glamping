<template>
    <div
        class="flex flex-col items-center justify-center w-full h-full gap-y-3 text-black text-center max-w-[400px] min-h-[calc(100vh-140px)] mx-auto pb-[20%]"
    >
        <h1 class="text-8xl font-bold mb-0">404</h1>
        <h2 class="text-3xl font-semibold mb-0">{{ $t('error.page-not-found') }}</h2>
        <p class="text-lg mb-0">{{ $t('error.broken-link-or-page-removed') }}</p>
    </div>
</template>

<script setup lang="ts"></script>

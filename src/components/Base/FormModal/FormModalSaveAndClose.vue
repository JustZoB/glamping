<template>
    <div
        class="sticky bottom-0 flex items-center self-end min-h-[43px] p-[2px] gap-3 justify-end overflow-hidden z-[1]"
    >
        <IconLoading
            class="text-slate-700 animate-spin animate-reverse"
            :class="{ block: isLoading, hidden: !isLoading }"
        />

        <button
            type="submit"
            class="button-sm bg-primary-800 text-white"
            :class="{ 'pointer-events-none bg-opacity-60': isLoading }"
            @click.prevent="handleSave"
        >
            {{ $t('button.save') }}
        </button>
        <button
            type="submit"
            class="button-sm bg-slate-700 text-white"
            :class="{ 'pointer-events-none bg-opacity-60': isLoading }"
            @click.prevent="handleSaveAndClose"
        >
            {{ $t('button.save-and-close') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import IconLoading from '@/components/Icons/IconLoading.vue';

const emits = defineEmits(['on-save', 'on-save-and-close']);

defineProps<{
    isLoading: boolean;
}>();

async function handleSave() {
    emits('on-save');
}
async function handleSaveAndClose() {
    emits('on-save-and-close');
}
</script>

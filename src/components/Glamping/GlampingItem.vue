<template>
    <div class="flex flex-col bg-white px-3 py-2 rounded-lg">
        <div class="flex justify-between gap-4">
            <p>{{ name }}</p>
            <button
                type="button"
                class="button-icon small bg-primary-800"
                :title="$t('button.edit')"
                @click="handleEditGlamping"
            >
                <PencilIcon />
            </button>
        </div>
        <GlampingTogglers
            v-if="showMore"
            :glamping="glamping"
            class="mt-2"
            @on-change-toggle-glamping="handleEditToggleGlamping"
        />
    </div>
</template>

<script setup lang="ts">
import { IGlamping } from '@/types/glamping';
import { PencilIcon } from '@heroicons/vue/24/outline';
import GlampingTogglers from '@/components/Glamping/GlampingTogglers.vue';

const props = defineProps<{
    id: number;
    name: string;
    glamping: IGlamping;
    showMore: boolean;
}>();

const emits = defineEmits<{
    (e: 'on-edit-glamping', id: number, name: string): void;
    (e: 'on-edit-toggle-glamping', id: number, glamping: IGlamping): void;
}>();

const handleEditGlamping = async () => {
    emits('on-edit-glamping', props.id, props.name);
};

const handleEditToggleGlamping = async (glamping: IGlamping) => {
    emits('on-edit-toggle-glamping', props.id, glamping);
};
</script>

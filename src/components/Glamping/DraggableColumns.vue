<template>
    <perfect-scrollbar class="flex gap-[20px] min-h-[575px] max-h-[575px]">
        <div
            v-for="(column, idx) in columns"
            :key="idx"
            class="flex-[1] border-t-8 p-3 pt-2 rounded-xl"
            :class="column.classes"
        >
            <h4 class="mb-3 font-medium text-lg">{{ column.title }}</h4>
            <draggable
                class="dragArea flex flex-col gap-y-3 min-h-[10px]"
                tag="div"
                :list="column.list"
                :group="{ name: 'g1' }"
                :animation="200"
                ghostClass="ghost"
                :forceFallback="true"
                :fallbackOnBody="true"
                fallbackClass="rotate-[3deg]"
                @update="updateSort"
            >
                <template #item="{ element }">
                    <div>
                        <GlampingItem
                            :id="element.id"
                            :name="element.name"
                            :glamping="element"
                            :show-more="isTogglersShown"
                            class="cursor-move"
                            @on-edit-glamping="handleEditGlamping"
                        />
                        <!-- @on-change-checkbox="handleChangeCheckboxValue(element.id)"
                            @on-create-children="handleCreateChildren(element.id)"
                            @on-edit="handleEdit(element.id)"
                            @on-delete="handleDelete(element.id)" -->
                    </div>
                </template>
            </draggable>
        </div>
    </perfect-scrollbar>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { IGlamping } from '@/types/glamping';
import GlampingItem from '@/components/Glamping/GlampingItem.vue';

defineProps<{
    columns: { title: string; classes?: string; list: IGlamping[] }[];
    isTogglersShown: boolean;
}>();

const emits = defineEmits<{
    (e: 'on-edit-glamping', id: number, name: string): void;
    (e: 'on-change-checkbox', value: boolean, id?: number): void;
    (e: 'on-edit-button-click', id: number): void;
    (e: 'on-delete', id: number): void;
    (e: 'on-drag-and-drop'): void;
}>();

// Drag & drop
const updateSort = async () => {
    emits('on-drag-and-drop');
};

const handleEditGlamping = async (id: number, name: string) => {
    emits('on-edit-glamping', id, name);
};
</script>

<template>
    <div class="relative w-full rounded-md px-6 bg-white">
        <table class="relative w-full">
            <thead class="sticky top-[64px] bg-white z-[1] lg:top-[60px]" :class="headClass">
                <slot name="headers"></slot>
                <tr class="shadow-sm z-[1] text-gray-400 uppercase text-sm">
                    <TableHeaders
                        :headers="headers"
                        :sort="{ sort: sortBy, order: sortType }"
                        @update-sort="updateSortField"
                        @update-local-sort="updateLocalSortField"
                    />
                </tr>
                <!-- <tr
                    v-if="
                        headers.filter((item) => item.sortableByMultiselect || item.sortableByTreeselector).length > 0
                    "
                    class="shadow-sm z-[1]"
                >
                    <TableMultiselectSortable :headers="headers" @update-sort-by-multiselect="updateSortByMultiselect" />
                </tr> -->
            </thead>
            <tbody class="bg-white">
                <slot name="table"></slot>
            </tbody>
        </table>
        <slot name="outside"></slot>
        <div
            v-if="loading"
            class="absolute flex items-center justify-center transition-all left-0 top-0 w-full h-full bg-white bg-opacity-60"
        >
            <img src="@/assets/loader.gif" class="z-[1]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import TableHeaders from '@/components/Base/TableHeaders/TableHeaders.vue';
// import TableMultiselectSortable from '@/components/Base/TableMultiselectSortable/TableMultiselectSortable.vue';
import type { ISort, ITableHeaders, SortType } from '@/types/table';
import type { IMultiselectFilters } from '@/types/filters';

const props = defineProps<{
    headers: ITableHeaders[];
    headClass?: string;
    sortBy?: string;
    sortType?: SortType | null;
    loading?: boolean;
}>();

const emits = defineEmits<{
    (e: 'updateSort', sorting: ISort): void;
    (e: 'updateLocalSort', sorting: ISort): void;
    (e: 'updateSortByMultiselect', sorting: IMultiselectFilters[]): void;
}>();

const sort = computed<ISort>(() => {
    return { sort: '', order: null };
});

watch(
    () => props.sortBy,
    async (sortBy) => {
        sort.value.sort = sortBy;
    }
);
watch(
    () => props.sortType,
    async (sortType) => {
        sort.value.order = sortType;
    }
);

const updateSortField = (field: string | undefined) => {
    if (!field) {
        return;
    }

    if (sort.value.sort === field) {
        sort.value.order = sort.value.order === 'desc' ? 'asc' : 'desc';
    } else {
        sort.value.sort = field;
        sort.value.order = 'asc';
    }

    emits('updateSort', sort.value);
};

const updateLocalSortField = (field: string | undefined) => {
    if (!field) {
        return;
    }

    if (sort.value.sort === field) {
        sort.value.order = sort.value.order === 'desc' ? 'asc' : 'desc';
    } else {
        sort.value.sort = field;
        sort.value.order = 'asc';
    }

    emits('updateLocalSort', sort.value);
};

// const updateSortByMultiselect = (multiSelectorsSorting: IMultiselectFilters[]) => {
//     emits('updateSortByMultiSelects', multiSelectorsSorting);
// };
</script>

<style lang="scss" scoped></style>

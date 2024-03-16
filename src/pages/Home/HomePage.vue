<template>
    <div class="flex gap-[30px]">
        <div class="flex-[1]">
            <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center gap-3 flex-[1]">
                    <SearchField
                        v-model="searchWord"
                        class="border border-gray-200 rounded-md w-full"
                        :placeholder="$t('input.placeholder.search', { it: $t('name.glamping') })"
                        @on-search="handleSearchGlamping"
                    />

                    <IconLoading
                        class="text-slate-700 animate-spin animate-reverse"
                        :class="{ block: isLoading, hidden: !isLoading }"
                    />
                </div>

                <button type="button" class="button-sm bg-blue-400 text-white" @click="handleShowTogglers">🔥</button>
                <button type="button" class="button-sm bg-green-500 text-white" @click="handleShowFilters">
                    <FunnelIcon class="w-[22px] h-[22px]" />
                </button>
            </div>
            <DraggableColumns
                :columns="columns"
                :isTogglersShown="isTogglersShown"
                @on-edit-glamping="handleEditGlamping"
            />
        </div>
        <div class="flex-[1]">
            <h3 class="mb-3 font-medium text-xl">Общие логи</h3>
            <div class="relative h-[600px] overflow-y-auto custom-scrollbar bg-gray-700 p-3 text-gray-20 rounded-md">
                <pre class="-mt-6" v-html="stacktrace"></pre>
            </div>
        </div>
    </div>

    <FormModal
        :title="`${$t('modal.title.edit.glamping')} ${editFormModalTitle}`"
        :visible="editFormModalShown"
        @on-close="handleEditFormModalClose"
    >
        <GlampingEdit
            v-if="editFormModalShown"
            @on-save="handleEditFormModalSave"
            @on-save-and-close="handleEditFormModalSaveAndClose"
        />
    </FormModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { FunnelIcon } from '@heroicons/vue/24/solid';
import DraggableColumns from '@/components/Glamping/DraggableColumns.vue';
import SearchField from '@/components/Base/CustomTable/SearchField/SearchField.vue';
import IconLoading from '@/components/Icons/IconLoading.vue';
import type { AxiosError } from 'axios';
import type { IRequestParams } from '@/types/api';
import FormModal from '@/components/Base/FormModal/FormModal.vue';
import GlampingEdit from '@/components/Glamping/GlampingEdit.vue';
import { IGlamping } from '@/types/glamping';

const toast = useToast();
const router = useRouter();
const { t } = useI18n();

const isLoading = ref<boolean>(false);
const searchWord = ref<string>('');

const requestParams = ref<IRequestParams>({});

const stacktrace = ref<string | null>(null);

const handleGetLaravelFile = async (file: string) => {
    const failedMessage = t('toast.failed.get', { it: file });
    isLoading.value = true;

    // try {
    //     const response = await getLaravelFile(file, requestParams.value);

    //     if (response.success === false) toast.error(failedMessage);

    //     if (response.data) {
    //         clearStacktrace();
    //     }
    // } catch (error) {
    //     const err = error as AxiosError;
    //     isLoading.value = false;
    //     toast.error(err && err.message ? err.message : failedMessage);
    // }

    isLoading.value = false;
};

const isTogglersShown = ref<boolean>(false);

const columns = ref<{ title: string; classes?: string; list: IGlamping[] }[]>([
    {
        title: 'Свободно',
        classes: 'bg-blue-300 border-blue-400',
        list: [
            {
                id: 1,
                name: 'Глэмпинг №1',
                customer: {},
                heating: true,
                forced_ventilation: false,
                electricity: true,
                security: false,
                opened: true,
                paid: true,
            },
            {
                id: 2,
                name: 'Глэмпинг №2',
                customer: {},
                heating: true,
                forced_ventilation: true,
                electricity: false,
                security: true,
                opened: true,
                paid: true,
            },
        ],
    },
    {
        title: 'Забронированно',
        classes: 'bg-yellow-300 border-yellow-500',
        list: [
            {
                id: 3,
                name: 'Глэмпинг №3',
                customer: {},
                heating: true,
                forced_ventilation: true,
                electricity: false,
                security: true,
                opened: false,
                paid: true,
            },
        ],
    },
    {
        title: 'Занято',
        classes: 'bg-red-300 border-red-400',
        list: [
            {
                id: 4,
                name: 'Глэмпинг №4',
                customer: {},
                heating: true,
                forced_ventilation: true,
                electricity: true,
                security: false,
                opened: true,
                paid: true,
            },
        ],
    },
]);

const handleSearchGlamping = async (query: string | undefined) => {
    const searchQuery: string = query ?? '';

    requestParams.value = { query: searchQuery };
    searchWord.value = searchQuery;
};

const clearStacktrace = async () => {
    stacktrace.value = null;
};

// Edit product
const editFormModalShown = ref<boolean>(false);
const editFormModalTitle = ref<string>('');
const handleEditGlamping = async (id: number, name: string) => {
    editFormModalTitle.value = name;
    await router.push({ name: `glamping-edit`, params: { id }, query: requestParams.value });
    editFormModalShown.value = true;
};
const handleEditFormModalClose = () => {
    editFormModalShown.value = false;
    router.push({ name: `home`, query: requestParams.value });
};
const handleEditFormModalSave = async () => {
    // await handleGetGlampings();
};
const handleEditFormModalSaveAndClose = async () => {
    await handleEditFormModalSave();
    handleEditFormModalClose();
};

const handleShowTogglers = async () => {
    isTogglersShown.value = !isTogglersShown.value;
};

const handleShowFilters = async () => {
    // show filters
};
</script>

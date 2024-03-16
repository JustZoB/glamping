<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold mb-0 text-black">{{ $t('users.title') }}</h1>

            <button
                type="button"
                class="button-icon bg-primary-800 px-10"
                :title="$t('button.create')"
                @click="handleCreateFormModalOpen"
            >
                {{ $t('button.create') }}
            </button>
        </div>

        <div class="flex gap-3 mb-4">
            <SearchField
                v-model="requestParams.query"
                :placeholder="$t('input.placeholder.search', { it: $t('name.users') })"
                @on-search="handleSearch"
            />
        </div>

        <CustomTable
            v-if="users"
            :headers="headers"
            :loading="isLoading"
            :sort-by="requestParams.sort"
            :sort-type="requestParams.order"
            @updateSort="handleSortUpdate"
            @update-local-sort="handleSortLocalUpdate"
        >
            <template v-slot:table>
                <tr v-for="row in users" :key="row.id">
                    <td class="py-2.5 px-3 text-left pl-0">{{ row.id }}</td>
                    <td class="py-2.5 px-3 text-left">{{ row.email }}</td>
                    <td class="py-2.5 px-3 text-left">{{ row.name }}</td>
                    <td class="py-2.5 px-3 text-left">{{ row.role ? row.role.title : $t('table.role.without') }}</td>
                    <td class="py-2.5 px-3 text-left">
                        <ToggleSwitcher
                            :value="row.active"
                            :id="row.id"
                            :disabled="isButtonDisabled(row)"
                            @on-change="handleChangeIsActive"
                        />
                    </td>
                    <td class="py-2.5 px-3 text-left sticky-column">
                        <div class="flex gap-4 justify-center">
                            <button
                                type="button"
                                class="button-icon bg-primary-800"
                                :title="$t('button.edit')"
                                @click="handleEdit(row)"
                            >
                                <PencilIcon />
                            </button>
                            <button
                                type="button"
                                class="button-icon bg-red-500"
                                :title="$t('button.delete')"
                                :tabindex="isButtonDisabled(row) ? -1 : 0"
                                :disabled="isButtonDisabled(row)"
                                :class="{
                                    'pointer-events-none opacity-60': isButtonDisabled(row),
                                }"
                                @click="handleConfirmDeleteRow(row.id)"
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    </td>
                </tr>
            </template>
            <template v-slot:outside>
                <PaginationTable
                    v-if="meta"
                    :loading="isLoading"
                    :meta="meta"
                    :limit="defaultLimit"
                    @to-page="handleToPage"
                />
            </template>
        </CustomTable>

        <DeleteConfirmation
            :rows="rowOnDelete"
            :isShown="isDeleteConfirmationShown"
            @on-close="handleCloseDeleteConfirmModal"
            @on-confirm="handleConfirmedDeleteRow"
        />

        <FormModal
            :title="$t('modal.title.create.user')"
            :visible="createFormModalShown"
            @on-close="handleCreateFormModalClose"
        >
            <UserCreate
                v-if="createFormModalShown"
                @on-save="handleCreateFormModalSave"
                @on-save-and-close="handleCreateFormModalSaveAndClose"
            />
        </FormModal>

        <FormModal
            :title="`${$t('modal.title.edit.user')} ${editFormModalTitle}`"
            :visible="editFormModalShown"
            @on-close="handleEditFormModalClose"
        >
            <UserEdit
                v-if="editFormModalShown"
                @on-save="handleEditFormModalSave"
                @on-save-and-close="handleEditFormModalSaveAndClose"
            />
        </FormModal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import type { AxiosError } from 'axios';
import { useUserStore } from '@/stores';
import CustomTable from '@/components/Base/CustomTable/CustomTable.vue';
import SearchField from '@/components/Base/CustomTable/SearchField/SearchField.vue';
import DeleteConfirmation from '@/components/Base/DeleteConfirmation/DeleteConfirmation.vue';
import ToggleSwitcher from '@/components/Base/ToggleSwitcher/ToggleSwitcher.vue';
import FormModal from '@/components/Base/FormModal/FormModal.vue';
import PaginationTable from '@/components/Base/PaginationTable/PaginationTable.vue';
import UserCreate from '@/components/User/UserCreate.vue';
import UserEdit from '@/components/User/UserEdit.vue';
import { isRequestSuccess, setRequestParamsFromQuery } from '@/utils/helpers';
import { getUsers, deleteUser, fastBlockUser } from '@/services/api/users.api';
import { getSortedTable, updateClassesToStickyColumns } from '@/utils/custom-table';
import type { ITableHeaders, ISort } from '@/types/table';
import type { IUser } from '@/types/users';
import type { IRequestParams, IMeta } from '@/types/api';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { t } = useI18n();

const userStore = useUserStore();

const users = ref<IUser[] | null>([]);
const headers: ITableHeaders[] = [
    { label: '#', field: 'id', sortable: true },
    { label: t('table.header.email'), field: 'email', sortable: true },
    { label: t('table.header.first-name'), field: 'name', sortable: true },
    { label: t('table.header.role'), field: 'role', sortable: true },
    { label: t('table.header.active') },
    { label: t('table.header.actions'), class: 'text-center sticky-column' },
];

const isLoading = ref<boolean>(false);
const meta = ref<IMeta | null>(null);
const defaultLimit = 50;
const requestParams = ref<IRequestParams>({ limit: defaultLimit });

onMounted(async () => {
    isLoading.value = true;

    const failedMessage = t('toast.failed.get', { it: t('name.users') });

    requestParams.value = setRequestParamsFromQuery(route.query);

    try {
        const response = await getUsers(requestParams.value);

        if (response.success === false) toast.error(failedMessage);

        if (response.data && response.meta) {
            users.value = response.data;
            meta.value = response.meta;

            if (route.params.id !== undefined) {
                const editedItem = users.value?.filter(
                    (user) => user.id !== null && user.id !== undefined && +user.id === +route.params.id
                )[0];

                editFormModalTitle.value = editedItem.name;
                editFormModalShown.value = true;
            }

            if (route.name === 'user-create') {
                createFormModalShown.value = true;
            }
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);
    }

    setTimeout(() => {
        updateClassesToStickyColumns();
    }, 1);

    isLoading.value = false;
});

const isButtonDisabled = (editedUser: IUser): boolean => {
    return (
        editedUser.id === userStore.getUser?.id ||
        (editedUser.role?.name === 'admin' && userStore.getUser?.role.name !== 'super-admin')
    );
};

// Get
const handleGetUsers = async () => {
    isLoading.value = true;

    const failedMessage = t('toast.failed.get', { it: t('name.users') });

    try {
        const response = await getUsers(requestParams.value);

        if (response.success === false) toast.error(failedMessage);

        if (response.data && response.meta) {
            users.value = response.data;
            meta.value = response.meta;
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);
    }

    setTimeout(() => {
        updateClassesToStickyColumns();
    }, 1);

    isLoading.value = false;
};

// Sorting
const handleSortUpdate = async (sorting: ISort) => {
    requestParams.value = { ...requestParams.value, ...sorting, page: 1 };
    router.push({ query: requestParams.value });
    await handleGetUsers();
};
const handleSortLocalUpdate = async (sorting: ISort) => {
    if (users.value && sorting.sort) {
        users.value = getSortedTable(users.value, sorting.sort, sorting.order);
    }
};

// Search
const handleSearch = async (query: string | undefined) => {
    requestParams.value = { ...requestParams.value, query, page: 1 };
    router.push({ query: requestParams.value });
    await handleGetUsers();
};

// Pagination
const handleToPage = async (page: number) => {
    requestParams.value = { ...requestParams.value, page };
    router.push({ query: requestParams.value });
    await handleGetUsers();
};

// Change checkbox in table
const handleChangeIsActive = async (value: boolean, id: number | undefined) => {
    const successMessage = t('toast.success.edit', { it: t('name.user') });
    const failedMessage = t('toast.failed.edit', { it: t('name.user') });

    if (!id) {
        toast.error(failedMessage);
        return;
    }

    try {
        const response = await fastBlockUser(+id, value);

        const success = isRequestSuccess(response, successMessage, failedMessage);

        if (!success) {
            return false;
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);

        return false;
    }
};

// Create
const createFormModalShown = ref<boolean>(false);
const handleCreateFormModalOpen = async () => {
    await router.push({ name: `user-create`, query: requestParams.value });
    createFormModalShown.value = true;
};
const handleCreateFormModalClose = async () => {
    await router.push({ name: `users`, query: requestParams.value });
    createFormModalShown.value = false;
};
const handleCreateFormModalSave = async () => {
    await handleGetUsers();
};
const handleCreateFormModalSaveAndClose = async () => {
    await handleCreateFormModalSave();
    handleCreateFormModalClose();
};

// Edit
const editFormModalShown = ref<boolean>(false);
const editFormModalTitle = ref<string>('');
const handleEdit = async (row: IUser) => {
    await router.push({ name: `user-edit`, params: { id: row.id }, query: requestParams.value });
    editFormModalShown.value = true;
    editFormModalTitle.value = row.name;
};
const handleEditFormModalClose = async () => {
    await router.push({ name: `users`, query: requestParams.value });
    editFormModalShown.value = false;
};
const handleEditFormModalSave = async () => {
    await handleGetUsers();
};
const handleEditFormModalSaveAndClose = async () => {
    await handleEditFormModalSave();
    handleEditFormModalClose();
};

// Delete
const isDeleteConfirmationShown = ref<boolean>(false);
const rowOnDelete = ref<number>();
const handleConfirmDeleteRow = (rowId?: number) => {
    isDeleteConfirmationShown.value = true;
    rowOnDelete.value = rowId;
};
const handleCloseDeleteConfirmModal = () => {
    isDeleteConfirmationShown.value = false;
};
const handleDelete = async (id: number) => {
    const successMessage = t('toast.success.delete', { it: t('name.user') });
    const failedMessage = t('toast.failed.delete', { it: t('name.user') });

    isLoading.value = true;

    try {
        const response = await deleteUser(id);

        const success = isRequestSuccess(response, successMessage, failedMessage);

        if (!success) {
            isLoading.value = false;
            return false;
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);

        isLoading.value = false;

        return false;
    }

    isLoading.value = false;

    await handleGetUsers();
};
const handleConfirmedDeleteRow = async (id: number) => {
    handleDelete(id);
    isDeleteConfirmationShown.value = false;
};
</script>

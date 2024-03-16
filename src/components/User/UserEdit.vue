<template>
    <form class="flex flex-col gap-7 h-full">
        <div class="grid grid-cols-12 auto-rows-max flex-[1] gap-6">
            <TextField
                v-model="user.name"
                autofocus
                type="text"
                input-name="name"
                :name="$t('input.name.first-name')"
                :disabled="
                    user.id !== userStore.getUser?.id &&
                    editedUserRole?.name === 'admin' &&
                    userStore.getUser?.role.name !== 'super-admin'
                "
                class="col-span-6 sm:col-span-12"
                :tooltip="$t('input.tooltip.first-name')"
                tooltipPosition="right"
                :isPreload="isPreload"
                :required="v$.name.required"
                :errors="v$.name.$errors"
            />

            <TextField
                v-model="user.email"
                type="email"
                input-name="email"
                :name="$t('input.name.email')"
                :disabled="
                    user.id !== userStore.getUser?.id &&
                    editedUserRole?.name === 'admin' &&
                    userStore.getUser?.role.name !== 'super-admin'
                "
                class="col-span-6 sm:col-span-12"
                :tooltip="$t('input.tooltip.email')"
                tooltipPosition="right"
                autocomplete="off"
                :isPreload="isPreload"
                :required="v$.email.required"
                :errors="v$.email.$errors"
            />

            <TextField
                v-model="user.password"
                type="password"
                input-name="password"
                :name="$t('input.name.new-password')"
                :disabled="
                    user.id !== userStore.getUser?.id &&
                    editedUserRole?.name === 'admin' &&
                    userStore.getUser?.role.name !== 'super-admin'
                "
                :isPreload="isPreload"
                class="col-span-6 sm:col-span-12"
                autocomplete="new-password"
            />

            <VueSelectWrapper
                class="col-span-6 sm:col-span-12"
                :name="$t('input.name.role')"
                :tooltip="$t('input.tooltip.role')"
                :isPreload="isPreload"
                :required="v$.role?.required"
                :errors="v$.role?.$errors"
            >
                <v-select
                    v-model="user.role"
                    :options="roles"
                    :class="{ 'custom-select-error': v$.role.$errors?.length, 'opacity-0': isPreload }"
                    name="role"
                    label="title"
                    :placeholder="$t('input.placeholder.role')"
                    :disabled="
                        user.id === userStore.getUser?.id ||
                        (editedUserRole?.name === 'admin' && userStore.getUser?.role.name !== 'super-admin')
                    "
                    class="custom-select"
                >
                    <template v-slot:option="option">
                        {{ $t(`role.${option.name}`) }}
                    </template>
                    <template v-slot:selected-option="option">
                        {{ $t(`role.${option.name}`) }}
                    </template>
                </v-select>
            </VueSelectWrapper>

            <ToggleSwitcher
                :value="user.active"
                input-name="active"
                :name="$t('button.active')"
                :disabled="
                    user.id === userStore.getUser?.id ||
                    (editedUserRole?.name === 'admin' && userStore.getUser?.role.name !== 'super-admin')
                "
                :isPreload="isPreload"
                @on-change="handleChangeIsActive"
            />
        </div>

        <FormModalSaveAndClose :isLoading="isLoading" @on-save="handleSave" @on-save-and-close="handleSaveAndClose" />
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import type { AxiosError } from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useUserStore } from '@/stores';
import TextField from '@/components/Base/TextField/TextField.vue';
import ToggleSwitcher from '@/components/Base/ToggleSwitcher/ToggleSwitcher.vue';
import FormModalSaveAndClose from '@/components/Base/FormModal/FormModalSaveAndClose.vue';
import VueSelectWrapper from '@/components/Base/VueSelectWrapper/VueSelectWrapper.vue';
import { isRequestSuccess } from '@/utils/helpers';
import { getEditUser, updateUser } from '@/services/api/users.api';
import type { IEditUser, IRole } from '@/types/users';

const route = useRoute();
const toast = useToast();
const { t } = useI18n();
const userStore = useUserStore();

const emits = defineEmits(['on-save', 'on-save-and-close']);

const isPreload = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const roles = ref<IRole[]>([]);
const editedUserRole = ref<IRole | null>(null);

const user = ref<IEditUser>({
    id: null,
    name: '',
    email: '',
    password: null,
    role: null,
    active: false,
});

const rules = {
    name: { required },
    email: { required, email },
    role: { required },
};
const v$ = useVuelidate(rules, user);

onMounted(async () => {
    isPreload.value = true;
    isLoading.value = true;

    const failedMessage = t('toast.failed.get', { it: t('name.user') });

    try {
        if (route.params.id) {
            const response = await getEditUser(+route.params.id);

            if (response.success === false) toast.error(failedMessage);

            if (response.data) {
                user.value = response.data;
                editedUserRole.value = response.data.role;
            }

            if (response.roles) roles.value = response.roles;
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);
    }

    isPreload.value = false;
    isLoading.value = false;
});

// Change checkbox
const handleChangeIsActive = (value: boolean) => {
    user.value.active = value;
};

// Edit
const handleEditUser = async (user: IEditUser): Promise<boolean> => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        toast.error(t('toast.not-valid'));
        return false;
    }

    const successMessage = t('toast.success.edit', { it: t('name.user') });
    const failedMessage = t('toast.failed.edit', { it: t('name.user') });

    isLoading.value = true;

    try {
        const response = await updateUser(+route.params.id, { ...user });

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

    return true;
};

// Save
async function handleSave() {
    const success = await handleEditUser(user.value);

    if (success) {
        emits('on-save');
    }
}
async function handleSaveAndClose() {
    const success = await handleEditUser(user.value);

    if (success) {
        emits('on-save-and-close');
    }
}
</script>

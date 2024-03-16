<template>
    <form class="flex flex-col gap-7 h-full">
        <div class="grid grid-cols-12 auto-rows-max flex-[1] gap-6">
            <TextField
                v-model="user.name"
                autofocus
                type="text"
                input-name="name"
                :name="$t('input.name.first-name')"
                class="col-span-6 sm:col-span-12"
                :tooltip="$t('input.tooltip.first-name')"
                tooltipPosition="right"
                :required="v$.name.required"
                :errors="v$.name.$errors"
            />

            <TextField
                v-model="user.email"
                type="email"
                input-name="email"
                :name="$t('input.name.email')"
                class="col-span-6 sm:col-span-12"
                :tooltip="$t('input.tooltip.email')"
                tooltipPosition="right"
                autocomplete="off"
                :required="v$.email.required"
                :errors="v$.email.$errors"
            />

            <TextField
                v-model="user.password"
                type="password"
                input-name="password"
                :name="$t('input.name.password')"
                :placeholder="$t('input.placeholder.password')"
                class="col-span-6 sm:col-span-12"
                :tooltip="$t('input.tooltip.password')"
                autocomplete="off"
                :required="v$.password.required"
                :errors="v$.password.$errors"
            />

            <VueSelectWrapper
                class="col-span-6 sm:col-span-12"
                :name="$t('input.name.role')"
                :tooltip="$t('input.tooltip.role')"
                :required="v$.role?.required"
                :errors="v$.role?.$errors"
            >
                <v-select
                    v-model="user.role"
                    :options="roles"
                    name="role"
                    :class="{ 'custom-select-error': v$.role.$errors?.length }"
                    label="title"
                    :placeholder="$t('input.placeholder.role')"
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
                class="col-span-6"
                @on-change="handleChangeIsActive"
            />
        </div>

        <FormModalSaveAndClose :isLoading="isLoading" @on-save="handleSave" @on-save-and-close="handleSaveAndClose" />
    </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import type { AxiosError } from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import TextField from '@/components/Base/TextField/TextField.vue';
import ToggleSwitcher from '@/components/Base/ToggleSwitcher/ToggleSwitcher.vue';
import FormModalSaveAndClose from '@/components/Base/FormModal/FormModalSaveAndClose.vue';
import VueSelectWrapper from '@/components/Base/VueSelectWrapper/VueSelectWrapper.vue';
import { isRequestSuccess } from '@/utils/helpers';
import { getCreateUser, createUser } from '@/services/api/users.api';
import type { ICreateUser, IRole } from '@/types/users';

const toast = useToast();
const { t } = useI18n();
const roles = ref<IRole[]>([]);

const emits = defineEmits(['on-save', 'on-save-and-close']);

const isLoading = ref<boolean>(false);

const user = ref<ICreateUser>({
    name: '',
    email: '',
    password: '',
    role: null,
    active: true,
});

const rules = {
    name: { required },
    email: { required, email },
    password: { required },
    role: { required },
};
const v$ = useVuelidate(rules, user);

onMounted(async () => {
    isLoading.value = true;

    try {
        const response = await getCreateUser();
        if (response.roles) {
            roles.value = response.roles;
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : t('toast.failed.get', { it: t('name.roles') }));
    }

    isLoading.value = false;
});

// Change checkbox
const handleChangeIsActive = (value: boolean) => {
    user.value.active = value;
};

// Create
const handleCreateUser = async (user: ICreateUser): Promise<boolean> => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        toast.error(t('toast.not-valid'));
        return false;
    }

    isLoading.value = true;

    const successMessage = t('toast.success.create', { it: t('name.user') });
    const failedMessage = t('toast.failed.create', { it: t('name.user') });

    try {
        const response = await createUser(user);

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
    const success = await handleCreateUser(user.value);

    if (success) {
        emits('on-save');
    }
}
async function handleSaveAndClose() {
    const success = await handleCreateUser(user.value);

    if (success) {
        emits('on-save-and-close');
    }
}
</script>

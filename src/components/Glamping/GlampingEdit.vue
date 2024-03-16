<template>
    <form class="flex flex-col gap-7 h-full">
        <div class="grid grid-cols-12 auto-rows-max flex-[1] gap-6">
            <TextField
                v-model="glamping.name"
                autofocus
                type="text"
                input-name="glamping_name"
                :name="$t('input.name.name')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.name')"
                tooltipPosition="right"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.local_temperature"
                type="number"
                input-name="local_temperature"
                addon="С°"
                :name="$t('input.name.local_temperature')"
                class="col-span-4 sm:col-span-12"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.target_temperature"
                type="number"
                input-name="target_temperature"
                addon="С°"
                :name="$t('input.name.target_temperature')"
                class="col-span-4 sm:col-span-12"
                :isPreload="isPreload"
            />

            <ToggleSwitcher
                :value="glamping.heating"
                input-name="heating"
                :name="$t('button.heating')"
                class="col-span-2"
                @on-change="handleChangeIsHeating"
            />

            <ToggleSwitcher
                :value="glamping.forced_ventilation"
                input-name="forced_ventilation"
                :name="$t('button.forced_ventilation')"
                class="col-span-2"
                @on-change="handleChangeIsForcedVentilation"
            />

            <ToggleSwitcher
                :value="glamping.electricity"
                input-name="electricity"
                :name="$t('button.electricity')"
                class="col-span-2"
                @on-change="handleChangeIsElectricity"
            />

            <ToggleSwitcher
                :value="glamping.security"
                input-name="security"
                :name="$t('button.security')"
                class="col-span-2"
                @on-change="handleChangeIsSecurity"
            />

            <ToggleSwitcher
                :value="glamping.opened"
                input-name="opened"
                :name="$t('button.opened')"
                class="col-span-2"
                @on-change="handleChangeIsOpened"
            />

            <ToggleSwitcher
                :value="glamping.paid"
                input-name="paid"
                :name="$t('button.paid')"
                class="col-span-2"
                @on-change="handleChangeIsPaid"
            />

            <TextField
                v-model="glamping.date_from"
                type="datetime-local"
                input-name="date_from"
                :name="$t('input.name.date_from')"
                class="col-span-6 sm:col-span-12"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.date_to"
                type="datetime-local"
                input-name="date_to"
                :name="$t('input.name.date_to')"
                class="col-span-6 sm:col-span-12"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.first_name"
                type="text"
                input-name="customer_first_name"
                :name="$t('input.name.first_name')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.first_name')"
                tooltipPosition="right"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.last_name"
                type="text"
                input-name="customer_last_name"
                :name="$t('input.name.last_name')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.last_name')"
                tooltipPosition="right"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.middle_name"
                type="text"
                input-name="customer_middle_name"
                :name="$t('input.name.middle_name')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.middle_name')"
                tooltipPosition="right"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.phone"
                type="tel"
                input-name="phone"
                :name="$t('input.name.phone')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.phone')"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.second_phone"
                type="tel"
                input-name="second_phone"
                :name="$t('input.name.second_phone')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.second_phone')"
                :isPreload="isPreload"
            />

            <TextField
                v-model="glamping.customer.email"
                type="email"
                input-name="email"
                :name="$t('input.name.email')"
                class="col-span-4 sm:col-span-12"
                :tooltip="$t('input.tooltip.email')"
                tooltipPosition="right"
                :isPreload="isPreload"
            />

            <div
                class="relative h-[300px] overflow-y-auto custom-scrollbar bg-gray-700 p-3 text-gray-20 rounded-md col-span-12"
            >
                <pre class="-mt-6" v-html="glamping.logs"></pre>
            </div>
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
import TextField from '@/components/Base/TextField/TextField.vue';
import FormModalSaveAndClose from '@/components/Base/FormModal/FormModalSaveAndClose.vue';
import { isRequestSuccess } from '@/utils/helpers';
// import { createCustomer } from '@/services/api/customers.api';
import type { IGlamping } from '@/types/glamping';
import { getEditGlamping } from '@/services/api/glamping.api';
import ToggleSwitcher from '../Base/ToggleSwitcher/ToggleSwitcher.vue';

const route = useRoute();
const toast = useToast();
const { t } = useI18n();

const emits = defineEmits(['on-save', 'on-save-and-close']);

const isLoading = ref<boolean>(false);
const isPreload = ref<boolean>(false);

const glamping = ref<IGlamping>({
    id: 0,
    name: '',
    date_from: null,
    date_to: null,
    customer: {
        first_name: '',
        last_name: '',
        middle_name: '',
        phone: '',
        second_phone: '',
        email: '',
    },
    local_temperature: undefined,
    target_temperature: undefined,
    heating: false,
    forced_ventilation: false,
    electricity: false,
    security: false,
    opened: false,
    paid: false,
    logs: [],
});

const rules = {};
const v$ = useVuelidate(rules, glamping);

onMounted(async () => {
    isPreload.value = true;
    isLoading.value = true;

    // await fetchGlampingOnInit();

    isPreload.value = false;
    isLoading.value = false;
});

const fetchGlampingOnInit = async () => {
    const failedMessage = t('toast.failed.get', { it: t('name.glamping.object') });

    try {
        if (route.params.id) {
            const response = await getEditGlamping(+route.params.id);

            if (response.data) {
                glamping.value = { ...response.data };
            } else {
                toast.error(response.message ? response.message : failedMessage);
            }
        }
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err && err.message ? err.message : failedMessage);
    }
};

// Change checkbox
const handleChangeIsHeating = (value: boolean) => {
    glamping.value.heating = value;
};
const handleChangeIsForcedVentilation = (value: boolean) => {
    glamping.value.forced_ventilation = value;
};
const handleChangeIsElectricity = (value: boolean) => {
    glamping.value.electricity = value;
};
const handleChangeIsSecurity = (value: boolean) => {
    glamping.value.security = value;
};
const handleChangeIsOpened = (value: boolean) => {
    glamping.value.opened = value;
};
const handleChangeIsPaid = (value: boolean) => {
    glamping.value.paid = value;
};

// Save
const handleEditGlamping = async (glamping: IGlamping): Promise<boolean> => {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        toast.error(t('toast.not-valid'));
        return false;
    }

    isLoading.value = true;

    const successMessage = t('toast.success.edit', { it: t('name.glamping') });
    const failedMessage = t('toast.failed.edit', { it: t('name.glamping') });

    // try {
    //     const response = await editGlamping(glamping);

    //     const success = isRequestSuccess(response, successMessage, failedMessage);

    //     if (!success) {
    //         isLoading.value = false;
    //         return false;
    //     }
    // } catch (error) {
    //     const err = error as AxiosError;
    //     toast.error(err && err.message ? err.message : failedMessage);

    //     isLoading.value = false;

    //     return false;
    // }

    isLoading.value = false;

    return true;
};

// Save
async function handleSave() {
    const success = await handleEditGlamping(glamping.value);

    if (success) {
        emits('on-save');
    }
}
async function handleSaveAndClose() {
    const success = await handleEditGlamping(glamping.value);

    if (success) {
        emits('on-save-and-close');
    }
}
</script>

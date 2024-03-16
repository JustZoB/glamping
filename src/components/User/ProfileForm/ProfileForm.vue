<template>
    <div class="bg-white py-7 px-9 rounded-md w-full sm:pt-5 sm:px-6">
        <form class="flex flex-col gap-7" @submit.prevent="handleSave">
            <TextField
                v-model="formData.name"
                autofocus
                type="text"
                input-name="name"
                :name="$t('input.name.name')"
                :tooltip="$t('input.tooltip.name')"
                :required="v$.name.required"
                :errors="v$.name.$errors"
            />

            <div class="w-full flex gap-6 sm:flex-col">
                <TextField
                    v-model="formData.email"
                    type="email"
                    input-name="email"
                    :name="$t('input.name.email')"
                    class="w-1/2 sm:w-full"
                    :tooltip="$t('input.tooltip.email')"
                    :required="v$.email.required"
                    :errors="v$.email.$errors"
                />

                <TextField
                    v-model="formData.phone"
                    type="tel"
                    input-name="phone"
                    :name="$t('input.name.phone')"
                    class="w-1/2 sm:w-full"
                    :tooltip="$t('input.tooltip.phone')"
                    :required="v$.phone.required"
                    :errors="v$.phone.$errors"
                />
            </div>

            <div class="flex justify-end gap-3">
                <button class="button-sm button-primary px-5" type="submit">{{ $t('button.save') }}</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';
import { required, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import TextField from '@/components/Base/TextField/TextField.vue';

const toast = useToast();
const { t } = useI18n();

interface IEditProfile {
    name: string;
    email: string;
    phone: string;
}

const formData = ref<IEditProfile>({
    name: 'Emma Smith',
    email: 'smith@kpmg.com',
    phone: '',
});

const rules = {
    name: { required },
    email: { required, email },
    phone: { required },
};
const v$ = useVuelidate(rules, formData);

async function handleSave() {
    const isValid = await v$.value.$validate();
    if (!isValid) {
        toast.error(t('toast.not-valid'));
        return false;
    }
}
</script>

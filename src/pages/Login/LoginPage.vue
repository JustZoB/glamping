<template>
    <div class="bg-white w-full flex flex-col items-center rounded-lg px-10 py-12 lg:px-8 lg:py-10">
        <h1 class="text-black text-3xl font-medium mb-8 lg:text-2xl lg:mb-6">Sign In to Koyu.Tech</h1>
        <form class="form flex flex-col w-full gap-8 lg:gap-6" @submit.prevent="login">
            <TextField
                v-model="formData.email"
                autofocus
                type="email"
                input-name="email"
                :name="$t('input.name.email')"
                :placeholder="$t('input.placeholder.email')"
                name-class="font-semibold text-xl mb-3 lg:text-base"
                input-class="px-5 py-4 text-base lg:px-4 lg:py-3 lg:text-sm"
                :required="v$.email.required"
                :errors="v$.email.$errors"
            />

            <TextField
                v-model="formData.password"
                type="password"
                input-name="password"
                :name="$t('input.name.password')"
                :placeholder="$t('input.placeholder.password')"
                name-class="font-semibold text-xl mb-3 lg:text-base"
                input-class="px-5 py-4 text-base lg:px-4 lg:py-3 lg:text-sm"
                :required="v$.password.required"
                :errors="v$.password.$errors"
            />

            <ErrorMessage v-if="errorMessage" :message="errorMessage" class="w-full" />

            <button type="submit" class="button-md button-primary w-full lg:button-sm">
                {{ $t('button.login') }}
            </button>

            <!-- <p class="text-black text-base font-medium mb-0">
                Demo username: admin@example.ru <span class="ml-3">password: admin</span>
            </p> -->
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import type { AxiosError } from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useUserStore } from '@/stores';
import api from '@/services/api';
import TextField from '@/components/Base/TextField/TextField.vue';
import ErrorMessage from '@/components/Base/ErrorMessage/ErrorMessage.vue';

const toast = useToast();
const { t } = useI18n();

const router = useRouter();

let errorMessage = ref('');
const formData = ref({
    email: '',
    password: '',
});

const rules = {
    email: { required, email },
    password: { required },
};
const v$ = useVuelidate(rules, formData);

async function login() {
    errorMessage.value = '';

    const isValid = await v$.value.$validate();
    if (!isValid) {
        toast.error(t('toast.not-valid'));
        return false;
    }

    const failedMessage = t('toast.failed.get', { it: t('name.profile') });

    if (formData.value.email && formData.value.password) {
        try {
            const result = await api.auth.login(formData.value.email, formData.value.password);
            if (result.success) {
                const { setUser, setToken } = useUserStore();
                if (result.data) {
                    setToken(result.data.token);
                    setUser(result.data.user);
                    return await router.push('/');
                }
                errorMessage.value = t('error.something-went-wrong');
            }

            if (result.message != null) {
                errorMessage.value = result.message;
            }
        } catch (error) {
            const err = error as AxiosError;
            toast.error(err && err.message ? err.message : failedMessage);
        }
    }
}
</script>

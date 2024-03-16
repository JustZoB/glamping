<template>
    <div>
        <p class="text-gray-700 text-base font-medium mb-2">{{ $t('input.name.language') }}</p>
        <v-select
            v-model="currentLocale"
            :options="supportedLocales"
            class="custom-select light"
            :clearable="false"
            @update:model-value="switchLanguage"
        >
            <template v-slot:option="option">
                {{ $t(`locale.${option.label}`) }}
            </template>
            <template v-slot:selected-option="option">
                {{ $t(`locale.${option.label}`) }}
            </template>
        </v-select>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Tr from '@/i18n/translation';

const router = useRouter();

const supportedLocales = Tr.supportedLocales;
const currentLocale = ref(Tr.currentLocale);

const switchLanguage = async (newLocale: string) => {
    await Tr.switchLanguage(newLocale);

    try {
        await router.replace({ params: { locale: newLocale } });
    } catch (e) {
        console.log(e);
        router.push('/');
    }
};
</script>

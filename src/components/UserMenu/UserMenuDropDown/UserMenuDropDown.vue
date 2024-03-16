<template>
    <div>
        <div class="relative pb-2 mb-2 border-b border-gray-300 border-opacity-50">
            <div class="flex items-center gap-2 pl-2">
                <UserIcon class="min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]" />
                <p>{{ store.user?.name }}: {{ $t(`role.${store.user?.role.name}`) }}</p>
            </div>
        </div>
        <div class="relative pb-2 mb-2 border-b border-gray-300 border-opacity-50">
            <div
                class="w-full cursor-pointer text-gray-700 font-normal hover:bg-gray-50 hover:text-primary-800 rounded-md"
                @click="toggleLanguageSubmenu"
            >
                <div class="relative flex pl-8 pr-4 py-2 sm:gap-2 sm:pl-4">
                    <p>{{ $t('input.name.language') }}: {{ $t(`locale.${currentLocale}`) }}</p>

                    <div class="absolute left-1 sm:hidden">
                        <ChevronLeftIcon class="w-6 h-6" />
                    </div>

                    <div class="hidden sm:block">
                        <ChevronDownIcon class="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div
                v-if="isLanguageSubmenuShown"
                class="shadow-dropdown z-10 absolute top-[-16px] right-[calc(100%+24px)] bg-white px-4 py-3 min-w-[200px] min-h-[60px] rounded-lg sm:left-0 sm:top-full"
            >
                <div class="flex flex-col">
                    <div
                        v-for="locale in supportedLocales"
                        :key="locale"
                        class="relative pl-4 pr-20 py-2 cursor-pointer text-gray-700 font-normal hover:bg-gray-50 hover:text-primary-800 rounded-md"
                        @click="switchLanguage(locale)"
                    >
                        <p class="block">{{ $t(`locale.${locale}`) }}</p>

                        <div v-if="locale === currentLocale" class="absolute right-2 z-1 top-1/2 translate-y-[-50%]">
                            <CheckIcon class="text-green-500 w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul class="flex flex-col">
            <li v-for="item in userLinkList" :key="item.name" class="flex">
                <button
                    v-if="item && item.callback && item.link"
                    type="button"
                    class="w-full text-gray-700 font-normal hover:bg-gray-50 hover:text-primary-800 rounded-md"
                    @click="
                        () => {
                            if (item.callback) item.callback(item.link);
                        }
                    "
                >
                    <span class="flex px-4 py-2">{{ $t(`profile.${item.name}`) }}</span>
                </button>
                <router-link
                    v-else-if="item.link"
                    :to="item.link"
                    class="w-full text-gray-700 font-normal hover:bg-gray-50 hover:text-primary-800 rounded-md"
                >
                    <span @click="handleClick" class="flex px-4 py-2">{{ $t(`profile.${item.name}`) }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserIcon, ChevronLeftIcon, CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '@/stores';
import Tr from '@/i18n/translation';
import api from '@/services/api';

const router = useRouter();
const store = useUserStore();

const supportedLocales = Tr.supportedLocales;
const currentLocale = ref(Tr.currentLocale);

interface UserLinksList {
    name: string;
    link: string;
    callback?: Function;
}

const logout = async (link: string) => {
    const result = await api.auth.logout();
    if (result.success) {
        const { setUser, setToken } = useUserStore();
        if (result.data) {
            setToken(null);
            setUser(null);
        }
    }
    await router.push(link);
};

const isLanguageSubmenuShown = ref<boolean>(false);
const userLinkList: UserLinksList[] = [
    // {
    //     name: 'edit-profile',
    //     link: 'account',
    // },
    {
        name: 'log-out',
        link: '/login',
        callback: logout,
    },
];

const switchLanguage = async (newLocale: string) => {
    await Tr.switchLanguage(newLocale);

    try {
        await router.replace({ params: { locale: newLocale } });
        currentLocale.value = newLocale;
    } catch (e) {
        console.log(e);
        router.push('/');
    }
};

const emit = defineEmits<{
    (event: 'changeRoute'): void;
}>();

const handleClick = () => {
    emit('changeRoute');
};

const toggleLanguageSubmenu = () => {
    isLanguageSubmenuShown.value = !isLanguageSubmenuShown.value;
};
</script>

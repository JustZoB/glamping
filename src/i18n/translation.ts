import type { Locale } from 'vue-i18n';
import i18n from '@/i18n/index';
import { nextTick } from 'vue';

const Trans = {
    get defaultLocale() {
        return import.meta.env.VITE_DEFAULT_LOCALE;
    },

    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(',');
    },

    get currentLocale() {
        return i18n.global.locale.value;
    },

    set currentLocale(newLocale) {
        i18n.global.locale.value = newLocale;
    },

    async switchLanguage(newLocale: Locale) {
        await Trans.loadLocaleMessages(newLocale);
        Trans.currentLocale = newLocale;
        const html = document.querySelector<HTMLElement>('html');
        if (html) {
            html.setAttribute('lang', newLocale);
        }
        localStorage.setItem('user-locale', newLocale);
    },

    async loadLocaleMessages(locale: Locale) {
        if (!i18n.global.availableLocales.includes(locale)) {
            const messages = await import(`@/i18n/locales/${locale}.json`);
            i18n.global.setLocaleMessage(locale, messages.default);
        }

        return nextTick();
    },

    isLocaleSupported(locale: Locale) {
        return Trans.supportedLocales.includes(locale);
    },

    getUserLocale() {
        const locale = window.navigator.language || Trans.defaultLocale;

        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0],
        };
    },

    getPersistedLocale() {
        const persistedLocale = localStorage.getItem('user-locale');

        if (persistedLocale && Trans.isLocaleSupported(persistedLocale)) {
            return persistedLocale;
        } else {
            return null;
        }
    },

    guessDefaultLocale() {
        const userPersistedLocale = Trans.getPersistedLocale();
        if (userPersistedLocale) {
            return userPersistedLocale;
        }

        const userPreferredLocale = Trans.getUserLocale();

        if (Trans.isLocaleSupported(userPreferredLocale?.locale)) {
            return userPreferredLocale.locale;
        }

        if (Trans.isLocaleSupported(userPreferredLocale?.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion;
        }

        return Trans.defaultLocale;
    },

    async routeMiddleware(to: any, _from: any, next: any) {
        const paramLocale = to.params.locale;

        if (!Trans.isLocaleSupported(paramLocale)) {
            return next(Trans.guessDefaultLocale());
        }

        await Trans.switchLanguage(paramLocale);

        return next();
    },

    i18nRoute(to: any) {
        return {
            ...to,
            params: {
                locale: Trans.currentLocale,
                ...to.params,
            },
        };
    },
};

export default Trans;

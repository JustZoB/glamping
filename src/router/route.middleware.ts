import type { Router } from 'vue-router';
import { useToast } from 'vue-toastification';
import createI18n from '@/i18n/index';
import Tr from '@/i18n/translation';

const { t } = createI18n.global;

export function initMiddleware(router: Router) {
    const toast = useToast();

    router.beforeEach(async (to, from, next) => {
        let paramLocale = to.params.locale;

        if (!Tr.isLocaleSupported(paramLocale as string)) {
            paramLocale = Tr.guessDefaultLocale();
        }

        await Tr.switchLanguage(paramLocale as string);

        if (to.meta.guard) {
            for (const guard of to.meta.guard) {
                const { success, message, role_failed } = await guard.routeAllowed(to);
                if (!success && to.name !== 'login') {
                    if (role_failed) {
                        toast.error(t('error.not-enough-rights'));
                        return next(from);
                    } else if (message && message !== t('error.not-authorized')) {
                        toast.error(message);
                    }
                    return next('/login');
                }
                return next();
            }
        }
        return next();
    });
}

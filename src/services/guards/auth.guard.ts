import type { IRouteGuard } from '@/router';
import createI18n from '@/i18n/index';
import { useUserStore } from '@/stores/user.store';
import api from '@/services/api';
import type { IUser } from '@/types/users';

const { t } = createI18n.global;

export class AuthGuard implements IRouteGuard {
    protected roles: string[] | null;

    public constructor(roles: string[] | null = null) {
        this.roles = roles;
    }

    async routeAllowed() {
        let message = t('error.not-authorized');
        const { token, user, setUser } = useUserStore();

        if (token) {
            if (user) {
                if (this.isRoleGranted(user)) {
                    return {
                        success: true,
                    };
                } else {
                    return {
                        role_failed: true,
                        success: false,
                        message: t('error.not-enough-rights'),
                    };
                }
            }

            const profile = await api.auth.getProfile();

            if (profile && profile.success) {
                if (profile.data) {
                    setUser(profile.data.user);
                }

                if (this.isRoleGranted(profile.data.user)) {
                    return {
                        success: true,
                    };
                } else {
                    return {
                        role_failed: true,
                        success: false,
                        message: t('error.not-enough-rights'),
                    };
                }
            }
            message = profile?.message ?? t('error.wrong.login-or-password');
        }

        return {
            // success: false,
            success: true,
            message: message,
        };
    }

    private isRoleGranted(user: IUser) {
        if (this.roles && this.roles.length > 0) {
            if (!this.roles.includes(user?.role?.name)) {
                return false;
            }
        }

        return true;
    }
}

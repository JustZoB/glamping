import { defineStore } from 'pinia';
import type { IUser } from '@/types/users';

interface IUserState {
    token: string | null;
    user: IUser | null;
}
export const useUserStore = defineStore({
    id: 'user',
    state: (): IUserState => ({
        token: localStorage.getItem('token'),
        user: null,
    }),
    getters: {
        isAllowed: (state) => {
            return (allowedRoles: string[]) => {
                if (state.user?.role.name) {
                    if (allowedRoles.includes(state.user?.role.name)) {
                        return true;
                    }
                }

                return true;
            };
        },
        getUser: (state) => {
            return state.user;
        },
    },
    actions: {
        setUser(user: IUser | null) {
            this.user = user;
        },
        setToken(token: string | null) {
            if (token) {
                localStorage.setItem('token', token);
            } else {
                localStorage.removeItem('token');
            }
            this.token = token;
        },
    },
});

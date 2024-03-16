import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router';
import LoginLayout from '@/layouts/LoginLayout.vue';
import { initMiddleware } from '@/router/route.middleware';
import { Auth } from '@/router/roles';

export type GuardResponse = {
    success: boolean;
    message?: string;
    role_failed?: boolean;
    nextRouteName?: string;
};

export interface IRouteGuard {
    routeAllowed(route: RouteLocationNormalized): Promise<GuardResponse>;
}

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        guard?: Array<IRouteGuard>;
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'home',
        component: () => import('@/pages/Home/HomePage.vue'),
        meta: {
            guard: [Auth],
        },
    },
    {
        path: '/:id/edit',
        name: 'glamping-edit',
        component: () => import('@/pages/Home/HomePage.vue'),
        meta: {
            guard: [Auth],
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login/LoginPage.vue'),
        meta: {
            layout: LoginLayout,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/NotFound/NotFoundPage.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
initMiddleware(router);

export default router;

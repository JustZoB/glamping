import { AuthGuard } from '@/services/guards/auth.guard';

export const Auth = new AuthGuard();
export const OnlySuperAdminGuard = new AuthGuard(['super-admin']);
export const OnlyAdminGuard = new AuthGuard(['super-admin', 'admin']);
export const AdminAdvertiserGuard = new AuthGuard(['super-admin', 'admin', 'advertiser']);
export const AdminManagerAdvertiserGuard = new AuthGuard(['super-admin', 'admin', 'manager', 'advertiser']);
export const AdminManagerStorekeeperGuard = new AuthGuard(['super-admin', 'admin', 'manager', 'storekeeper']);

import type { ReactNode } from 'react';

import type { EAppRoutes } from '../constants';

import type { NavigationKeys } from './i18n.model';

export interface INavigationTabItem {
    key: EAppRoutes;
    icon: ReactNode;
    label: NavigationKeys;
    path: string;
    requiresAuth?: boolean;
}

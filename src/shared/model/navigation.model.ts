import type { ReactNode } from 'react';

import type { EAppRoutes } from '../constants';

export interface INavigationTabItem {
    key: EAppRoutes;
    icon: ReactNode;
    label: string;
    path: string;
    requiresAuth?: boolean;
}

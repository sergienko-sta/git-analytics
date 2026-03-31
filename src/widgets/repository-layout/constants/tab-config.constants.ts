import * as Shared from '@shared';

import type * as Model from '../model';

export const TAB_KEYS = {
    COMPARE: 'compare',
    PAGINATION: 'pagination',
    INFINITE: 'infinite',
} as const;

export const TAB_CONFIG: Model.TabConfig[] = [
    {
        key: TAB_KEYS.COMPARE,
        route: Shared.EAppRoutes.REPOSITORY,
        translationKey: 'tabs.compare',
        check: (path: string) => path === Shared.routePaths[Shared.EAppRoutes.REPOSITORY],
    },
    {
        key: TAB_KEYS.PAGINATION,
        route: Shared.EAppRoutes.REPOSITORY_PAGINATION,
        translationKey: 'tabs.pagination',
        check: (path: string) => path.includes(Shared.REPOSITORY_CHILD_ROUTES.PAGINATION),
    },
    {
        key: TAB_KEYS.INFINITE,
        route: Shared.EAppRoutes.REPOSITORY_INFINITE,
        translationKey: 'tabs.infinite',
        check: (path: string) => path.includes(Shared.REPOSITORY_CHILD_ROUTES.INFINITE),
    },
];

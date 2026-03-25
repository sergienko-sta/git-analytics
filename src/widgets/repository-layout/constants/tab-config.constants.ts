import * as Shared from '@shared';

import type * as Model from '../model';

export const TAB_CONFIG: Model.TabConfig[] = [
    {
        key: 'compare',
        route: Shared.EAppRoutes.REPOSITORY,
        translationKey: 'tabs.compare',
        check: (path: string) => path === Shared.routePaths[Shared.EAppRoutes.REPOSITORY],
    },
    {
        key: 'pagination',
        route: Shared.EAppRoutes.REPOSITORY_PAGINATION,
        translationKey: 'tabs.pagination',
        check: (path: string) => path.includes('pagination'),
    },
    {
        key: 'infinite',
        route: Shared.EAppRoutes.REPOSITORY_INFINITE,
        translationKey: 'tabs.infinite',
        check: (path: string) => path.includes('infinite'),
    },
];

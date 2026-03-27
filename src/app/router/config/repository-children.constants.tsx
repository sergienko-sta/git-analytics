import { type RouteObject } from 'react-router-dom';

import * as Shared from '@shared';

import * as Lazy from './lazy-load-pages.constants';

export const repositoryChildrenRoutes: RouteObject[] = [
    {
        index: true,
        element: <Lazy.RepositoryPage />,
    },
    {
        path: Shared.REPOSITORY_CHILD_ROUTES.PAGINATION,
        element: <Lazy.RepositoryPaginationPage />,
    },
    {
        path: Shared.REPOSITORY_CHILD_ROUTES.INFINITE,
        element: <Lazy.RepositoryInfinitePage />,
    },
];

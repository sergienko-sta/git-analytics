import { type RouteObject } from 'react-router-dom';

import * as Shared from '@shared';

const HomePage = Shared.lazyLoad(() => import('@pages/home'), {
    componentName: 'HomePage',
    enabled: import.meta.env.DEV,
});
const RepositoryPage = Shared.lazyLoad(() => import('@/pages/repository'), {
    componentName: 'RepositoryPage',
    enabled: import.meta.env.DEV,
});

export const routes: RouteObject[] = [
    {
        path: Shared.routePaths[Shared.EAppRoutes.HOME],
        element: <HomePage />,
    },
    {
        path: Shared.routePaths[Shared.EAppRoutes.REPOSITORY],
        element: <RepositoryPage title='Custom Title' />,
    },
    {
        path: Shared.routePaths[Shared.EAppRoutes.NOT_FOUND],
        // TODO: add NotFound component
        element: <div>NOT FOUND</div>,
    },
];

import { type RouteObject } from 'react-router-dom';

import * as Widgets from '@widgets';

import * as Shared from '@shared';

import * as Lazy from './lazy-load-pages.constants';
import { repositoryChildrenRoutes } from './repository-children.constants';

export const routes: RouteObject[] = [
    {
        path: Shared.routePaths[Shared.EAppRoutes.HOME],
        element: <Lazy.HomePage />,
    },
    {
        path: Shared.routePaths[Shared.EAppRoutes.REPOSITORY],
        element: <Widgets.RepositoryLayout />,
        children: repositoryChildrenRoutes,
    },
    {
        path: Shared.routePaths[Shared.EAppRoutes.NOT_FOUND],
        element: <div>NOT FOUND</div>, // TODO: replace with NotFound component
    },
];

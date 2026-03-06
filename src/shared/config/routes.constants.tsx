import { type RouteObject } from 'react-router-dom';

import { EAppRoutes, routePaths } from '../constants';
import { StubContent } from '../ui';

export const routes: RouteObject[] = [
    {
        path: routePaths[EAppRoutes.HOME],
        element: <StubContent />,
    },
    {
        path: routePaths[EAppRoutes.NOT_FOUND],
        // TODO: add NotFound component
        element: <div>NOT FOUND</div>,
    },
];

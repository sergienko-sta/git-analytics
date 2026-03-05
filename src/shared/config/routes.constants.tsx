import { type RouteObject } from 'react-router-dom';

import { AppRoutes, routePaths } from '../constants';
import { StubContent } from '../ui';

export const routes: RouteObject[] = [
    {
        path: routePaths[AppRoutes.HOME],
        element: <StubContent />,
    },
    {
        path: routePaths[AppRoutes.NOT_FOUND],
        // TODO: add NotFound component
        element: <div>NOT FOUND</div>,
    },
];

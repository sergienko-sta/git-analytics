import { type RouteObject } from 'react-router-dom';

import * as Shared from '@shared';

export const routes: RouteObject[] = [
    {
        path: Shared.routePaths[Shared.AppRoutes.HOME],
        element: <Shared.StubContent />,
    },
    {
        path: Shared.routePaths[Shared.AppRoutes.NOT_FOUND],
        // TODO: add NotFound component
        element: <div>NOT FOUND</div>,
    },
];

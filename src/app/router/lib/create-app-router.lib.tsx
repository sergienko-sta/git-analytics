import { createBrowserRouter } from 'react-router-dom';

import * as Shared from '@shared';

import { routes } from '../config';
import { RootLayout } from '../ui';

export const createAppRouter = () => {
    return createBrowserRouter([
        {
            path: Shared.routePaths[Shared.AppRoutes.HOME],
            element: <RootLayout />,
            // TODO: add ErrorElement component
            errorElement: <div>Произошла ошибка</div>,
            children: routes,
        },
    ]);
};

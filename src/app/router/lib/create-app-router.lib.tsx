import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@widgets';

import * as Shared from '@shared';

import { routes } from '../config';

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

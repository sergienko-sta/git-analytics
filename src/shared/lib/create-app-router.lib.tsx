import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@widgets';

import { routes } from '../config';
import { EAppRoutes, routePaths } from '../constants';

export const createAppRouter = () => {
    return createBrowserRouter([
        {
            path: routePaths[EAppRoutes.HOME],
            element: <RootLayout />,
            // TODO: add ErrorElement component
            errorElement: <div>Произошла ошибка</div>,
            children: routes,
        },
    ]);
};

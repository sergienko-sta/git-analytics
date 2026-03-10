import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { EAppRoutes, routePaths } from '../../constants';

export interface ICreateRouterOptions {
    rootElement: ReactNode;
    errorElement?: ReactNode;
    children?: RouteObject[];
}

export const createAppRouter = ({
    rootElement,
    errorElement = <div>Произошла ошибка</div>,
    children = [],
}: ICreateRouterOptions) => {
    return createBrowserRouter([
        {
            path: routePaths[EAppRoutes.HOME],
            element: rootElement,
            errorElement,
            children,
        },
    ]);
};

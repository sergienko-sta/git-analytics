import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import type { EAppRoutes } from '../../constants';
import { type RouteParams, routePathFunctions } from '../../model';

import { isRouteWithoutParams } from './lib';

export const useAppNavigate = () => {
    const navigate = useNavigate();

    const to = useCallback(
        <T extends EAppRoutes>(
            route: T,
            ...args: RouteParams[T] extends undefined ? [] : [RouteParams[T]]
        ) => {
            const params = args[0];

            if (isRouteWithoutParams(route)) {
                const path = (routePathFunctions[route] as () => string)();
                navigate(path);
            } else {
                const path = (
                    routePathFunctions[route] as (params: RouteParams[T] | undefined) => string
                )(params);
                navigate(path);
            }
        },
        [navigate],
    );

    const back = useCallback(() => navigate(-1), [navigate]);
    const forward = useCallback(() => navigate(1), [navigate]);

    return { to, back, forward };
};

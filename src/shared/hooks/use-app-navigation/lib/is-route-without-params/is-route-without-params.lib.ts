import { EAppRoutes } from '../../../../constants';

type TRouteWithoutParams = EAppRoutes.HOME | EAppRoutes.NOT_FOUND;
export const isRouteWithoutParams = (route: EAppRoutes): route is TRouteWithoutParams => {
    return route === EAppRoutes.HOME || route === EAppRoutes.NOT_FOUND;
};

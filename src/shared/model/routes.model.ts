import { EAppRoutes, routePaths } from '../constants';

export type RouteParams = {
    [EAppRoutes.HOME]: Record<string, never>;
    [EAppRoutes.PROFILE]: { login: string };
    [EAppRoutes.REPOSITORY]: { query?: string };
    [EAppRoutes.NOT_FOUND]: Record<string, never>;
};

export type RoutePathFunction<T extends EAppRoutes> = T extends EAppRoutes.HOME
    ? () => string
    : T extends EAppRoutes.NOT_FOUND
      ? () => string
      : (params: RouteParams[T]) => string;

export const routePathFunctions: {
    [K in EAppRoutes]: RoutePathFunction<K>;
} = {
    [EAppRoutes.HOME]: () => routePaths[EAppRoutes.HOME],
    [EAppRoutes.PROFILE]: ({ login }: RouteParams[EAppRoutes.PROFILE]) =>
        `/${EAppRoutes.PROFILE}/${login}`,
    [EAppRoutes.REPOSITORY]: (params?: RouteParams[EAppRoutes.REPOSITORY]) => {
        const base = `/${EAppRoutes.REPOSITORY}`;
        if (!params?.query) return base;
        const searchParams = new URLSearchParams();
        if (params.query) searchParams.set('q', params.query);
        return `${base}?${searchParams.toString()}`;
    },
    [EAppRoutes.NOT_FOUND]: () => routePaths[EAppRoutes.NOT_FOUND],
};

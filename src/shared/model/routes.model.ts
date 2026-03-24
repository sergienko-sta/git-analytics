import { EAppRoutes, routePaths } from '../constants';
import * as Lib from '../lib';

export type RouteParams = {
    [EAppRoutes.HOME]: Record<string, never>;
    [EAppRoutes.PROFILE]: { login: string };
    [EAppRoutes.REPOSITORY]: Record<string, never>;
    [EAppRoutes.REPOSITORY_PAGINATION]: { query?: string };
    [EAppRoutes.REPOSITORY_INFINITE]: { query?: string };
    [EAppRoutes.NOT_FOUND]: Record<string, never>;
};

export type RoutePathFunction<T extends EAppRoutes> =
    RouteParams[T] extends Record<string, never>
        ? () => string
        : (params: RouteParams[T]) => string;

export const routePathFunctions: {
    [K in EAppRoutes]: RoutePathFunction<K>;
} = {
    [EAppRoutes.HOME]: () => routePaths[EAppRoutes.HOME],
    [EAppRoutes.PROFILE]: ({ login }: RouteParams[EAppRoutes.PROFILE]) =>
        `/${EAppRoutes.PROFILE}/${login}`,
    [EAppRoutes.REPOSITORY]: () => routePaths[EAppRoutes.REPOSITORY],
    [EAppRoutes.REPOSITORY_PAGINATION]: (params?: RouteParams[EAppRoutes.REPOSITORY_PAGINATION]) =>
        Lib.createRepositoryPath(`/${EAppRoutes.REPOSITORY_PAGINATION}`, params),
    [EAppRoutes.REPOSITORY_INFINITE]: (params?: RouteParams[EAppRoutes.REPOSITORY_INFINITE]) =>
        Lib.createRepositoryPath(`/${EAppRoutes.REPOSITORY_INFINITE}`, params),
    [EAppRoutes.NOT_FOUND]: () => routePaths[EAppRoutes.NOT_FOUND],
};

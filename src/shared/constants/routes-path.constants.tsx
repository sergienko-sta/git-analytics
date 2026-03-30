export const REPOSITORY_CHILD_ROUTES = {
    PAGINATION: 'pagination',
    INFINITE: 'infinite',
} as const;

export enum EAppRoutes {
    HOME = 'home',
    PROFILE = 'profile',
    REPOSITORY = 'repository',
    REPOSITORY_PAGINATION = 'repository-pagination',
    REPOSITORY_INFINITE = 'repository-infinite',
    NOT_FOUND = 'not_found',
}

export const routePaths = {
    [EAppRoutes.HOME]: '/',
    [EAppRoutes.PROFILE]: '/profile/:login',
    [EAppRoutes.REPOSITORY]: '/repository',
    [EAppRoutes.REPOSITORY_PAGINATION]: `/repository/${REPOSITORY_CHILD_ROUTES.PAGINATION}`,
    [EAppRoutes.REPOSITORY_INFINITE]: `/repository/${REPOSITORY_CHILD_ROUTES.INFINITE}`,
    [EAppRoutes.NOT_FOUND]: '*',
} as const;

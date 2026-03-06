export enum EAppRoutes {
    HOME = 'home',
    PROFILE = 'profile',
    REPOSITORY = 'repository',
    NOT_FOUND = 'not_found',
}

export const routePaths = {
    [EAppRoutes.HOME]: '/',
    [EAppRoutes.PROFILE]: '/profile/:login',
    [EAppRoutes.REPOSITORY]: '/repository',
    [EAppRoutes.NOT_FOUND]: '*',
} as const;

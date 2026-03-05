export enum AppRoutes {
    HOME = 'home',
    NOT_FOUND = 'not_found',
}

export const routePaths = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.NOT_FOUND]: '*',
} as const;

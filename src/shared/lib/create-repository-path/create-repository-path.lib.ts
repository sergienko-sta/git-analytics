import * as Constants from '../../constants';

/* v8 ignore start */
export const createRepositoryPath = (
    route: Constants.EAppRoutes,
    params?: { query?: string },
): string => {
    const basePath = Constants.routePaths[route];
    if (!params?.query) return basePath;

    const searchParams = new URLSearchParams();
    searchParams.set(Constants.URL_PARAMS.QUERY, params.query);
    return `${basePath}?${searchParams.toString()}`;
};
/* v8 ignore stop */

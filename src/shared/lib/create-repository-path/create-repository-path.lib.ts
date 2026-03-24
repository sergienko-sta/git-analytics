import * as Constants from '../../constants';

/* v8 ignore start */
export const createRepositoryPath = (basePath: string, params?: { query?: string }): string => {
    if (!params?.query) return basePath;

    const searchParams = new URLSearchParams();
    searchParams.set(Constants.URL_PARAMS.QUERY, params.query);
    return `${basePath}?${searchParams.toString()}`;
};
/* v8 ignore stop */

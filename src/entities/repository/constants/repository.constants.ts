import type * as Model from '../model';

export const searchReposGuid = {
    all: ['repos'] as const,
    search: (params: Model.TSearchReposParams) =>
        [...searchReposGuid.all, 'search', params] as const,
    infiniteSearch: (params: Omit<Model.TSearchReposParams, 'page'>) =>
        [...searchReposGuid.all, 'infinite', params] as const,
};

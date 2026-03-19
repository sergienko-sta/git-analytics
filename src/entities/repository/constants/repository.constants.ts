import type * as Model from '../model';

export const searchReposGuid = {
    all: ['repos'] as const,
    search: (params: Model.TSearchReposParams) =>
        [...searchReposGuid.all, 'search', params] as const,
};

import { Octokit } from '@octokit/rest';

import * as Shared from '@shared';

import type * as Model from '../model';

/* v8 ignore start */
const githubClient = new Octokit();

class RepositoryApi {
    async searchRepos(params: Model.TSearchReposParams): Promise<Model.TSearchReposResponse> {
        const {
            q: query,
            sort,
            order,
            page = Shared.DEFAULT_PAGE,
            perPage = Shared.DEFAULT_PAGE_SIZE,
        } = params;

        const searchQuery = `is:public ${query}`;

        const { data } = await githubClient.search.repos({
            q: searchQuery,
            sort: sort || 'stars',
            order: order || 'desc',
            per_page: perPage,
            page,
        });

        return data;
    }
}

export const repositoryApi = new RepositoryApi();
/* v8 ignore stop */

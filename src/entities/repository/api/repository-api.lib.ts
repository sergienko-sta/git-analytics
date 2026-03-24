import { Octokit } from '@octokit/rest';

import * as Shared from '@shared';

import type * as Model from '../model';

/* v8 ignore start */
const githubClient = new Octokit();

class RepositoryApi {
    /**
     * Поиск репозиториев с пагинацией
     */
    async searchRepos(params: Model.TSearchReposParams): Promise<Model.TSearchReposResponse> {
        const {
            q: query,
            sort,
            order,
            page = Shared.DEFAULT_PAGE,
            perPage = Shared.DEFAULT_PAGE_SIZE,
        } = params;

        if (!query?.trim()) {
            return this.getEmptySearchResponse();
        }

        const searchQuery = this.buildSearchQuery(query);
        const requestParams = this.buildSearchRequestParams({
            searchQuery,
            sort,
            order,
            page,
            perPage,
        });

        const { data } = await githubClient.search.repos(requestParams);
        return data;
    }

    /**
     * Поиск репозиториев для бесконечного скролла
     */
    async searchReposInfinite(
        params: Omit<Model.TSearchReposParams, 'page'> & { page?: number },
    ): Promise<Model.TSearchReposInfiniteResponse> {
        const {
            q: query,
            sort,
            order,
            page = Shared.DEFAULT_PAGE,
            perPage = Shared.DEFAULT_PAGE_SIZE,
        } = params;

        if (!query?.trim() || query.length < Shared.MIN_QUERY_LENGTH) {
            return this.getEmptyInfiniteResponse();
        }

        const searchQuery = this.buildSearchQuery(query);
        const requestParams = this.buildSearchRequestParams({
            searchQuery,
            sort,
            order,
            page,
            perPage,
        });

        const { data } = await githubClient.search.repos(requestParams);

        return {
            items: data.items,
            totalCount: data.total_count,
            nextPage: data.items.length === perPage ? page + 1 : undefined,
        };
    }

    // ============ Приватные методы ============

    /**
     * Формирует поисковый запрос
     */
    private buildSearchQuery(query: string): string {
        return `is:public ${query}`;
    }

    /**
     * Формирует параметры запроса
     */
    private buildSearchRequestParams({
        searchQuery,
        sort,
        order,
        page,
        perPage,
    }: Omit<Model.TSearchReposParams, 'q'> & {
        searchQuery: string;
    }): Model.TSearchReposParamsApi {
        return {
            q: searchQuery,
            sort: sort || Shared.GITHUB_SORT.STARS,
            order: order || Shared.GITHUB_ORDER.DESC,
            per_page: perPage,
            page,
        };
    }

    /**
     * Возвращает пустой ответ для обычного поиска
     */
    private getEmptySearchResponse(): Model.TSearchReposResponse {
        return {
            total_count: 0,
            incomplete_results: false,
            items: [],
        };
    }

    /**
     * Возвращает пустой ответ для бесконечного поиска
     */
    private getEmptyInfiniteResponse(): Model.TSearchReposInfiniteResponse {
        return {
            items: [],
            totalCount: 0,
            nextPage: undefined,
        };
    }
}

export const repositoryApi = new RepositoryApi();
/* v8 ignore stop */

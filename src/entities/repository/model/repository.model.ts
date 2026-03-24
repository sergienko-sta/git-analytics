import type { ReactNode } from 'react';
import type { Endpoints } from '@octokit/types';

export type TSearchReposParamsApi = Endpoints['GET /search/repositories']['parameters'];
export type TSearchReposResponse = Endpoints['GET /search/repositories']['response']['data'];

export type TSearchReposParams = Omit<TSearchReposParamsApi, 'per_page'> & {
    perPage: number;
};

export type TSearchReposData = TSearchReposResponse['items'][0];

export interface IRepositoryCardProps {
    repository: TSearchReposData;
    footer?: ReactNode;
}

export interface IRepositoryStatisticProps {
    repository: TSearchReposData;
}

export type TSearchReposInfiniteResponse = Pick<TSearchReposResponse, 'items'> & {
    totalCount: number;
    nextPage: number | undefined;
};

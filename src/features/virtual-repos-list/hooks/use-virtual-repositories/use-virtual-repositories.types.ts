import type { RefObject } from 'react';
import type * as Entities from '@entities';
import type {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import type { Virtualizer } from '@tanstack/react-virtual';

type TUseVirtualRepositoryArgs = {
    query: Entities.TSearchReposParams['q'];
    perPage?: Entities.TSearchReposParams['perPage'];
    estimateSize?: number;
    overscan?: number;
};

type TUseVirtualRepositoryResult = {
    parentRef: RefObject<HTMLDivElement | null>;
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
    items: Entities.TSearchReposData[];
    isLoading: boolean;
    error: Error | null;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: (
        options?: FetchNextPageOptions,
    ) => Promise<
        InfiniteQueryObserverResult<
            InfiniteData<Entities.TSearchReposInfiniteResponse, unknown>,
            Error
        >
    >;
    totalCount: number;
};

export type TUseVirtualRepository = (
    args: TUseVirtualRepositoryArgs,
) => TUseVirtualRepositoryResult;

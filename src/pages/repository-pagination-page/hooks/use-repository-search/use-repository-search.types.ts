import type * as Entities from '@entities';

type TUseRepositorySearchResult = {
    query: string;
    currentPage: number;
    perPage: number;
    data: Entities.TSearchReposResponse | undefined;
    isLoading: boolean;
    error: Error | null;
    handleSearch: (searchQuery: string) => void;
    handlePageChange: (page: number) => void;
};

export type TUseRepositorySearch = () => TUseRepositorySearchResult;

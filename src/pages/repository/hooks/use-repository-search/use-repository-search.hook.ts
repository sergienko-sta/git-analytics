import { useCallback, useState } from 'react';

import * as Entities from '@entities';

import * as Shared from '@shared';

import type * as Types from './use-repository-search.types';
/* v8 ignore start */
export const useRepositorySearch: Types.TUseRepositorySearch = () => {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(Shared.DEFAULT_PAGE);
    const [perPage] = useState(Shared.DEFAULT_PAGE_SIZE);

    const { data, isLoading, error } = Entities.useSearchRepos({
        q: query,
        page: currentPage,
        perPage,
    });

    const handleSearch = useCallback((searchQuery: string) => {
        setQuery(searchQuery);
        setCurrentPage(Shared.DEFAULT_PAGE);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return {
        query,
        currentPage,
        perPage,
        data,
        isLoading,
        error,
        handleSearch,
        handlePageChange,
    };
};
/* v8 ignore stop */

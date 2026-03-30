import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as Entities from '@entities';

import * as Shared from '@shared';

import type * as Types from './use-repository-search.types';
/* v8 ignore start */
export const useRepositorySearch: Types.TUseRepositorySearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // TODO: создать shared утилиту
    const query =
        (searchParams.has(Shared.URL_PARAMS.QUERY) &&
            searchParams.get(Shared.URL_PARAMS.QUERY)?.trim()) ||
        '';
    const [currentPage, setCurrentPage] = useState(Shared.DEFAULT_PAGE);
    const [perPage] = useState(Shared.DEFAULT_PAGE_SIZE);

    const { data, isLoading, error } = Entities.useSearchRepos({
        q: query,
        page: currentPage,
        perPage,
    });

    const handleSearch = useCallback(
        (query: string) => {
            if (query.trim()) {
                setSearchParams({ q: query.trim() }, { replace: false });
            }
            setCurrentPage(Shared.DEFAULT_PAGE);
        },
        [setSearchParams],
    );

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

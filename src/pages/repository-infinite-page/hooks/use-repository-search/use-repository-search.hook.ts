import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import * as Shared from '@shared';

import type * as Types from './use-repository-search.types';
/* v8 ignore start */
export const useRepositorySearch: Types.TUseRepositorySearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query =
        (searchParams.has(Shared.URL_PARAMS.QUERY) &&
            searchParams.get(Shared.URL_PARAMS.QUERY)?.trim()) ||
        '';

    const handleClearSearch = useCallback(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    return {
        query,
        handleClearSearch,
    };
};
/* v8 ignore stop */

import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import * as Entities from '@entities';

import * as Shared from '@shared';

import * as Constants from '../../constants';

import type * as Types from './use-virtual-repositories.types';

/* v8 ignore start */
export const useVirtualRepositories: Types.TUseVirtualRepository = (args) => {
    const {
        query,
        perPage = Shared.DEFAULT_PAGE_SIZE,
        estimateSize = Constants.ESTIMATE_SIZE,
        overscan = Constants.OVERSCAN,
    } = args;
    const parentRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
        Entities.useSearchReposInfinite({ q: query, perPage });

    const allItems = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

    const rowVirtualizer = useVirtualizer({
        count: allItems.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimateSize,
        overscan,
    });

    return {
        parentRef,
        rowVirtualizer,
        items: allItems,
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        totalCount: data?.pages[0]?.totalCount ?? 0,
    };
};
/* v8 ignore stop */

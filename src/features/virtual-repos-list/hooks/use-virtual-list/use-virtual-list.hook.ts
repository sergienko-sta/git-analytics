import { useCallback, useRef } from 'react';

import * as Shared from '@shared';

import * as Constants from '../../constants';
import { useVirtualRepositories } from '../use-virtual-repositories';

import type * as Types from './use-virtual-list.types';

/* v8 ignore start */
export const useVirtualRepositoryList: Types.TUseVirtualList = ({
    query,
    pageSize = Shared.DEFAULT_PAGE_SIZE,
    estimateSize = Constants.ESTIMATE_SIZE,
}) => {
    const {
        parentRef,
        rowVirtualizer,
        items,
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        totalCount,
    } = useVirtualRepositories({
        query,
        perPage: pageSize,
        estimateSize,
    });

    const observerRef = useRef<IntersectionObserver | null>(null);

    const lastItemRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            if (!node || !hasNextPage || isFetchingNextPage || isLoading) return;

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                        fetchNextPage().catch(() => undefined);
                    }
                },
                // TODO: сделать rootMargin вычисляемым в зависимости от условий сети или типа устройства
                { threshold: 0.1, rootMargin: '100px' },
            );

            observerRef.current.observe(node);
        },
        [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage],
    );

    const isEndOfList = !hasNextPage && items.length > 0;

    return {
        parentRef,
        rowVirtualizer,
        items,
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        totalCount,
        lastItemRef,
        isEndOfList,
    };
};
/* v8 ignore stop */

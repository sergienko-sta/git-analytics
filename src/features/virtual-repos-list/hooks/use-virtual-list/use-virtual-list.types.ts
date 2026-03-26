import type { RefObject } from 'react';

import type { useVirtualRepositories } from '../use-virtual-repositories';

type TUseVirtualListArgs = {
    query: string;
    pageSize?: number;
    estimateSize?: number;
};

type TUseVirtualListResult = {
    parentRef: RefObject<HTMLDivElement | null>;
    rowVirtualizer: ReturnType<typeof useVirtualRepositories>['rowVirtualizer'];
    items: ReturnType<typeof useVirtualRepositories>['items'];
    isLoading: boolean;
    error: ReturnType<typeof useVirtualRepositories>['error'];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    totalCount: number;
    lastItemRef: (node: HTMLDivElement | null) => void;
    isEndOfList: boolean;
};

export type TUseVirtualList = (args: TUseVirtualListArgs) => TUseVirtualListResult;

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin, Typography } from 'antd';

import * as Entities from '@entities';

import * as Shared from '@shared';

import * as Constants from '../constants';
import * as Hooks from '../hooks';
import type * as Model from '../model';

import * as Styles from './virtual-repos-list.styles';

const { Text } = Typography;

export const VirtualRepositoryList = memo(
    ({
        query,
        pageSize = Shared.DEFAULT_PAGE_SIZE,
        estimateSize = Constants.ESTIMATE_SIZE,
    }: Model.IVirtualRepositoryListProps) => {
        const { t } = useTranslation('features');

        const {
            parentRef,
            rowVirtualizer,
            items,
            isLoading,
            error,
            isFetchingNextPage,
            totalCount,
            lastItemRef,
            isEndOfList,
        } = Hooks.useVirtualRepositoryList({ query, pageSize, estimateSize });

        if (error) {
            return (
                <Shared.ErrorDisplay
                    error={error}
                    title={t('virtual-repos-list.error.title')}
                    onRetry={() => window.location.reload()}
                />
            );
        }

        if (isLoading) {
            return <Shared.LoadingDisplay description={t('virtual-repos-list.loading.title')} />;
        }

        if (!items.length) {
            return (
                <Shared.EmptyStateDisplay
                    message={t('virtual-repos-list.empty.title')}
                    description={t('virtual-repos-list.empty.description')}
                />
            );
        }

        const virtualItems = rowVirtualizer.getVirtualItems();
        const totalHeight = rowVirtualizer.getTotalSize();

        return (
            <Styles.Container>
                <Styles.Header>
                    <Text type='secondary'>
                        {t('virtual-repos-list.stats.found', {
                            count: totalCount,
                        })}
                    </Text>
                    {isFetchingNextPage && <Spin size='small' />}
                </Styles.Header>

                <Styles.VirtualListContainer ref={parentRef}>
                    <div style={{ height: totalHeight, position: 'relative' }}>
                        {virtualItems.map((virtualRow, index) => {
                            const repository = items[virtualRow.index];
                            if (!repository) return null;

                            const isLastItem = index === virtualItems.length - 1;

                            return (
                                <Styles.VirtualListItem
                                    key={virtualRow.key}
                                    ref={isLastItem ? lastItemRef : undefined}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    <Entities.RepositoryCard
                                        repository={repository}
                                        footer={
                                            <Entities.RepositoryStatistic repository={repository} />
                                        }
                                    />
                                </Styles.VirtualListItem>
                            );
                        })}
                    </div>

                    {isFetchingNextPage && (
                        <Shared.LoadingDisplay
                            size='small'
                            description={t('virtual-repos-list.loadingMore')}
                        />
                    )}

                    {isEndOfList && (
                        <Shared.EndOfListDisplay message={t('virtual-repos-list.endOfList')} />
                    )}
                </Styles.VirtualListContainer>
            </Styles.Container>
        );
    },
);

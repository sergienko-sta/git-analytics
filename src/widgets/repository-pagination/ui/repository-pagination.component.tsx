import { memo } from 'react';
import { Pagination } from 'antd';

import * as Shared from '@shared';

import type * as Model from '../model';

import * as Styles from './repository-pagination.styles';

export const RepositoryPagination = memo(
    ({ currentPage, totalCount, pageSize, onChange }: Model.IRepositoryPaginationProps) => {
        const maxTotal = Math.min(totalCount, Shared.GITHUB_MAX_TOTAL_COUNT);

        if (maxTotal <= pageSize) {
            return null;
        }

        return (
            <Styles.PaginationContainer>
                <Pagination
                    current={currentPage}
                    total={maxTotal}
                    pageSize={pageSize}
                    onChange={onChange}
                    showSizeChanger={false}
                />
            </Styles.PaginationContainer>
        );
    },
);

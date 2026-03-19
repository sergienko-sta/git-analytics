import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';

import * as Widgets from '@widgets';

import * as Features from '@features';

import * as Hooks from '../hooks';

import * as Styles from './repository-page.styles';

export const RepositoryPage = () => {
    const { t } = useTranslation('pages');
    const { query, currentPage, perPage, data, isLoading, error, handleSearch, handlePageChange } =
        Hooks.useRepositorySearch();

    return (
        <Widgets.PageContainer title={t('repository.title')}>
            <Flex vertical gap='middle'>
                <Features.SearchQuery
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    initialValue={query}
                />

                <Widgets.ErrorDisplay error={error} title={t('repository.search-error')} />
            </Flex>

            {data && (
                <>
                    <Styles.Text>
                        {t('repository.total-repos')} {data.total_count.toLocaleString()}
                    </Styles.Text>

                    <Features.SearchReposResult data={data} />

                    <Widgets.RepositoryPagination
                        currentPage={currentPage}
                        totalCount={data.total_count}
                        pageSize={perPage}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </Widgets.PageContainer>
    );
};

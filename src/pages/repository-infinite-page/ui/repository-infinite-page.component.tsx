import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';
import { Alert, Button, Flex } from 'antd';

import * as Widgets from '@widgets';

import * as Features from '@features';

import * as Hooks from '../hooks';

export const RepositoryInfinitePage = () => {
    const { t } = useTranslation('pages');
    const { query, handleClearSearch } = Hooks.useRepositorySearch();

    return (
        <Widgets.PageContainer title={t('repository-infinite-page.title')}>
            <Flex vertical gap='middle'>
                <Alert
                    type='info'
                    description={t('repository-infinite-page.description')}
                    closable={{ closeIcon: true }}
                />
                <Button
                    type='primary'
                    icon={<SearchOutlined />}
                    size='large'
                    onClick={handleClearSearch}
                >
                    {t('repository-infinite-page.clear-btn')}
                </Button>
                <Features.VirtualRepositoryList query={query} />
            </Flex>
        </Widgets.PageContainer>
    );
};

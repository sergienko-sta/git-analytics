import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, theme } from 'antd';

import * as Shared from '@shared';

import * as Hooks from '../hooks';
import type * as Model from '../model';

import * as Styles from './search-query.styles';

const { Search } = Input;

export const SearchQuery = memo(
    ({
        onSearch,
        isLoading = false,
        initialValue = '',
        placeholder = '',
        debounceMs = Shared.DEBOUNCE_DELAY.SLOW,
    }: Model.ISearchQueryProps) => {
        const { token } = theme.useToken();
        const { t } = useTranslation('features');
        const { inputValue, handleImmediateSearch, handleChange, handleClear } =
            Hooks.useSearchQuery({ initialValue, debounceMs, onSearch });

        return (
            <Search
                placeholder={placeholder || t('search-query.placeholder')}
                value={inputValue}
                onChange={handleChange}
                onSearch={handleImmediateSearch}
                loading={isLoading}
                size='large'
                enterButton={t('search-query.search-button')}
                allowClear
                onClear={handleClear}
                prefix={<Styles.SearchIcon $color={token.colorTextTertiary} />}
            />
        );
    },
);

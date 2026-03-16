import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import type * as Types from './use-search-query.types';

/* v8 ignore start */
export const useSearchQuery: Types.TUseSearchQuery = ({ initialValue, debounceMs, onSearch }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            if (value.trim()) {
                onSearch(value.trim());
            }
        },
        debounceMs,
        { leading: false, trailing: true },
    );

    const handleImmediateSearch = useCallback(
        (value: string) => {
            if (!value.trim()) return;
            debouncedSearch.cancel();
            onSearch(value.trim());
        },
        [onSearch, debouncedSearch],
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            debouncedSearch(newValue);
        },
        [debouncedSearch],
    );

    const handleClear = useCallback(() => {
        setInputValue('');
        debouncedSearch.cancel();
        onSearch('');
    }, [onSearch, debouncedSearch]);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return {
        inputValue,
        handleImmediateSearch,
        handleChange,
        handleClear,
    };
};
/* v8 ignore stop */

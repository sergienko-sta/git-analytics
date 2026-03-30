import type * as Shared from '@shared';

export interface ISearchQueryProps {
    onSearch: (query: string) => void;
    isLoading?: boolean;
    initialValue?: string;
    placeholder?: string;
    debounceMs?: Shared.Model.TDebounceDelay;
}

import type { ChangeEvent } from 'react';

import type * as Model from '../../model';

type TUseSearchQueryArgs = Required<
    Pick<Model.ISearchQueryProps, 'initialValue' | 'debounceMs' | 'onSearch'>
>;

type TUseSearchQueryResult = {
    inputValue: NonNullable<Model.ISearchQueryProps['initialValue']>;
    handleImmediateSearch: (value: string) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
};

export type TUseSearchQuery = (args: TUseSearchQueryArgs) => TUseSearchQueryResult;

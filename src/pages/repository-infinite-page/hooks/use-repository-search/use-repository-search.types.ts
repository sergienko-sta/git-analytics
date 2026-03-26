type TUseRepositorySearchResult = {
    query: string;
    handleClearSearch: () => void;
};

export type TUseRepositorySearch = () => TUseRepositorySearchResult;

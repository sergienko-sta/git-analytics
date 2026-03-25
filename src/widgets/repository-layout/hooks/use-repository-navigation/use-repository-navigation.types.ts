type TUseRepositoryNavigationResult = {
    getActiveKey: () => string;
    handleTabChange: (key: string) => void;
    tabItems: { key: string; label: string }[];
};

export type TUseRepositoryNavigation = () => TUseRepositoryNavigationResult;

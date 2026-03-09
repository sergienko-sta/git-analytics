import type * as Shared from '@shared';

export type TUseNavigationResult = {
    activeTab: Shared.EAppRoutes;
    handleLogoClick: () => void;
    handleTabChange: (tab: Shared.EAppRoutes) => void;
};

export type TUseNavigation = () => TUseNavigationResult;

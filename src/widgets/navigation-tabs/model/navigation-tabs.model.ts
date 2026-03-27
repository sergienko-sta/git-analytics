import type * as Shared from '@shared';

export interface INavigationTabsProps {
    activeTab: Shared.EAppRoutes;
    onTabChange: (tab: Shared.EAppRoutes) => void;
}

import type { JSX } from 'react';
import type * as Shared from '@shared';

type TUseNavigationTabsArgs = {
    onTabChange: (key: Shared.EAppRoutes) => void;
};

type TUseNavigationTabsResult = {
    handleTabChange: (key: string) => void;
    tabItems: { key: Shared.EAppRoutes; label: JSX.Element }[];
};

export type TUseNavigationTabs = (args: TUseNavigationTabsArgs) => TUseNavigationTabsResult;

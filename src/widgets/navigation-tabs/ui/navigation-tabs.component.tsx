import { memo } from 'react';

import * as Hooks from '../hooks';

import * as Styles from './navigation-tabs.styles';
import type * as Types from './navigation-tabs.types';

export const NavigationTabs = memo(({ activeTab, onTabChange }: Types.INavigationTabsProps) => {
    const { handleTabChange, tabItems } = Hooks.useNavigationTabs({ onTabChange });

    return (
        <Styles.Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            size='middle'
            centered
            items={tabItems}
        />
    );
});

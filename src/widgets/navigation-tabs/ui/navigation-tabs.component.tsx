import { memo } from 'react';

import * as Hooks from '../hooks';
import type * as Model from '../model';

import * as Styles from './navigation-tabs.styles';

export const NavigationTabs = memo(({ activeTab, onTabChange }: Model.INavigationTabsProps) => {
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

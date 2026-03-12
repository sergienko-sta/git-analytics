import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import * as Shared from '@shared';

import * as Styles from './use-navigation-tabs.styles';
import type * as Types from './use-navigation-tabs.types';

export const useNavigationTabs: Types.TUseNavigationTabs = (args) => {
    const { onTabChange } = args;
    const { t } = useTranslation('navigation');
    const handleTabChange = useCallback(
        (key: string) => {
            onTabChange(key as Shared.EAppRoutes);
        },
        [onTabChange],
    );

    const renderTabLabel = useCallback(
        (tab: Shared.Model.INavigationTabItem) => (
            <Styles.TabContainer>
                {tab.icon}
                {t(tab.label)}
            </Styles.TabContainer>
        ),
        [t],
    );

    const tabItems = useMemo(
        () =>
            Shared.NAVIGATION_TAB_ITEMS.map((tab) => ({
                key: tab.key,
                label: renderTabLabel(tab),
            })),
        [renderTabLabel],
    );

    return { handleTabChange, tabItems };
};

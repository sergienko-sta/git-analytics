import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import * as Shared from '@shared';

import * as Constants from '../../constants';

import type * as Types from './use-repository-navigation.types';

/* v8 ignore start */
export const useRepositoryNavigation: Types.TUseRepositoryNavigation = () => {
    const { t } = useTranslation('widgets');
    const { to } = Shared.useAppNavigate();
    const location = useLocation();
    const getActiveKey = useCallback(() => {
        const path = location.pathname;
        const activeTab = Constants.TAB_CONFIG.find((tab) => tab.check(path));
        return activeTab?.key ?? 'compare';
    }, [location.pathname]);

    const handleTabChange = useCallback(
        (key: string) => {
            const tab = Constants.TAB_CONFIG.find((t) => t.key === key);
            if (tab) {
                to(tab.route, {});
            }
        },
        [to],
    );

    const tabItems = useMemo(
        () =>
            Constants.TAB_CONFIG.map((tab) => ({
                key: tab.key,
                label: t(`repository-layout.${tab.translationKey}`),
            })),
        [t],
    );

    return { tabItems, getActiveKey, handleTabChange };
};
/* v8 ignore stop */

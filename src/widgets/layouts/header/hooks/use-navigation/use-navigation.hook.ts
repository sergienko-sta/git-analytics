import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import * as Shared from '@shared';

import type * as Types from './use-navigation.types';

export const useNavigation: Types.TUseNavigation = () => {
    const { to } = Shared.useAppNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(
        () =>
            Shared.navigationService.getKeyByPath(location.pathname) ??
            Shared.navigationService.getDefaultKey(),
    );

    useEffect(() => {
        const key = Shared.navigationService.getKeyByPath(location.pathname);

        if (key) {
            setActiveTab(key);
        }
    }, [location.pathname]);

    const handleTabChange = useCallback(
        (key: Shared.EAppRoutes) => {
            const tab = Shared.navigationService.getItemByKey(key);

            if (tab && tab.key !== activeTab) {
                setActiveTab(tab.key);
                to(tab.key, {});
            }
        },
        [to, activeTab],
    );

    const handleLogoClick = useCallback(() => {
        if (!Shared.navigationService.isHomeKey(activeTab)) {
            to(Shared.navigationService.getDefaultKey(), {});
        }
    }, [to, activeTab]);

    return {
        activeTab,
        handleTabChange,
        handleLogoClick,
    };
};
